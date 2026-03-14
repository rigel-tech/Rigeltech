#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */

/**
 * Re-fetches a URL and updates the corresponding news document in MongoDB
 * (matching by slug or sourceUrl) with the cleaned HTML content.
 *
 * Usage:
 *   node scripts/refresh-news-content.js <url-or-slug>
 *
 * This is useful after improving the content extraction logic so you can
 * re-run it for an already-imported article.
 */

const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in environment variables.");
  process.exit(1);
}
if (!MONGODB_DB) {
  console.error("Missing MONGODB_DB in environment variables.");
  process.exit(1);
}

const removeTags = (html, tag) => {
  const re = new RegExp(`<${tag}[^>]*>[\s\S]*?<\/${tag}>`, "gi");
  return html.replace(re, "");
};

const normalizeRelativeUrls = (html, baseUrl) => {
  try {
    const base = new URL(baseUrl);

    html = html.replace(/\b(src|href)=(["'])(?!https?:|\/\/)([^"']+)\2/gi, (match, attr, quote, value) => {
      try {
        return `${attr}=${quote}${new URL(value, base).toString()}${quote}`;
      } catch {
        return match;
      }
    });

    // Convert lazy-loading attributes into real src/srcset
    html = html
      .replace(/\bdata-src=(['"])([^'"]+)\1/gi, "src=$1$2$1")
      .replace(/\bdata-srcset=(['"])([^'"]+)\1/gi, "srcset=$1$2$1")
      .replace(/\bdata-original=(['"])([^'"]+)\1/gi, "src=$1$2$1");

    html = html.replace(/\bsrcset=(["'])([^"']+)\1/gi, (match, quote, value) => {
      const parts = value.split(",");
      const fixed = parts
        .map((part) => {
          const [url, ...rest] = part.trim().split(/\s+/);
          try {
            const abs = new URL(url, base).toString();
            return [abs, ...rest].join(" ");
          } catch {
            return part;
          }
        })
        .join(", ");
      return `srcset=${quote}${fixed}${quote}`;
    });

    return html;
  } catch {
    return html;
  }
};

const pickContent = (html, baseUrl) => {
  const patterns = [
    /<div[^>]+class=["'][^"']*article-content[^"']*["'][\s\S]*?<\/div>/i,
    /<div[^>]+id=["']content_article["'][\s\S]*?<\/div>/i,
    /<article[\s\S]*?<\/article>/i,
    /<body[^>]*>([\s\S]*?)<\/body>/i,
  ];

  let content = "";
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      content = match[0];
      break;
    }
  }

  ["header", "footer", "nav", "aside", "script", "style", "noscript"].forEach((tag) => {
    content = removeTags(content, tag);
  });

  content = normalizeRelativeUrls(content, baseUrl);
  return content;
};

const normalizeUrl = (value) => {
  const trimmed = String(value || "").trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const main = async () => {
  const arg = process.argv[2];
  if (!arg) {
    console.error("Usage: node scripts/refresh-news-content.js <url-or-slug>");
    process.exit(1);
  }

  const normalized = normalizeUrl(arg) || arg;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  const query = {
    $or: [
      { slug: arg },
      { id: arg },
      { sourceUrl: normalized },
      { sourceUrl: arg },
    ],
  };

  const existing = await db.collection("news").findOne(query);
  if (!existing) {
    console.error("No news document found for slug or URL:", arg);
    await client.close();
    process.exit(1);
  }

  const url = existing.sourceUrl || normalized;
  console.log("Refreshing content for:", url);

  const res = await fetch(url, {
    headers: { "User-Agent": "RigelCMS/1.0" },
  });
  if (!res.ok) {
    console.error("Failed to fetch URL:", res.status, res.statusText);
    await client.close();
    process.exit(1);
  }

  const html = await res.text();
  const content = pickContent(html, url);

  const update = {
    content,
    updatedAt: new Date().toISOString(),
  };

  await db
    .collection("news")
    .updateOne({ _id: existing._id }, { $set: update });

  console.log("Updated document", existing._id.toString());
  await client.close();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
