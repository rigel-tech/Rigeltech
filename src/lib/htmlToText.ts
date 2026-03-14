// Utility to convert a small subset of HTML into a readable Markdown-like text format.
// This is intended for use in the admin editor to let people edit HTML content as text
// while preserving heading sizes and structure (paragraphs, lists, links, bold/italic).

export function htmlToText(html: string): string {
    if (!html) return "";

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const normalizeTextNode = (text: string): string =>
        text.replace(/\r/g, "").trim();

    const walk = (node: Node, depth = 0): string => {
        if (node.nodeType === Node.TEXT_NODE) {
            return normalizeTextNode(node.textContent ?? "");
        }

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return "";
        }

        const el = node as HTMLElement;
        const children = Array.from(el.childNodes).map((child) => walk(child, depth));
        const inner = children.join("");
        const indent = "  ".repeat(depth);

        switch (el.tagName.toLowerCase()) {
            case "h1":
                return `# ${inner}\n\n`;
            case "h2":
                return `## ${inner}\n\n`;
            case "h3":
                return `### ${inner}\n\n`;
            case "h4":
                return `#### ${inner}\n\n`;
            case "h5":
                return `##### ${inner}\n\n`;
            case "h6":
                return `###### ${inner}\n\n`;
            case "p":
                return `${inner}\n\n`;
            case "br":
                return "\n";
            case "strong":
            case "b":
                return `**${inner}**`;
            case "em":
            case "i":
                return `*${inner}*`;
            case "a": {
                const href = el.getAttribute("href") || "";
                return href ? `[${inner}](${href})` : inner;
            }
            case "ul": {
                return `${inner}\n`;
            }
            case "ol": {
                return `${inner}\n`;
            }
            case "li": {
                const marker = el.parentElement?.tagName.toLowerCase() === "ol" ? "1." : "-";
                return `${indent}${marker} ${inner}\n`;
            }
            case "pre":
                return "\n```\n" + (el.textContent ?? "") + "\n```\n\n";
            case "code":
                return `\`${inner}\``;
            case "blockquote":
                return `> ${inner}\n\n`;
            default:
                return inner;
        }
    };

    const body = doc.body;
    let text = "";
    body.childNodes.forEach((node) => {
        text += walk(node, 0);
    });

    return text.trim();
}

export function textToHtml(text: string): string {
    if (!text) return "";

    const lines = text.split("\n");
    let html = "";
    let inList = false;
    let listType: "ul" | "ol" | null = null;
    let currentParagraph = "";

    const closeList = () => {
        if (inList) {
            html += `</${listType}>\n`;
            inList = false;
            listType = null;
        }
    };

    const closeParagraph = () => {
        if (currentParagraph.trim()) {
            html += `<p>${processInline(currentParagraph.trim())}</p>\n`;
            currentParagraph = "";
        }
    };

    const processInline = (line: string): string => {
        // Simple inline processing: bold, italic, links, code
        return line
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/`([^`]+)`/g, "<code>$1</code>")
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    };

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            closeList();
            closeParagraph();
            continue;
        }

        if (trimmed.startsWith("#")) {
            closeList();
            closeParagraph();
            const match = trimmed.match(/^(#+)\s*(.+)$/);
            if (match) {
                const level = match[1].length;
                const content = match[2];
                html += `<h${level}>${processInline(content)}</h${level}>\n`;
            }
        } else if (trimmed.startsWith("- ")) {
            if (!inList || listType !== "ul") {
                closeList();
                closeParagraph();
                html += "<ul>\n";
                inList = true;
                listType = "ul";
            }
            const content = trimmed.slice(2);
            html += `<li>${processInline(content)}</li>\n`;
        } else if (/^\d+\.\s/.test(trimmed)) {
            if (!inList || listType !== "ol") {
                closeList();
                closeParagraph();
                html += "<ol>\n";
                inList = true;
                listType = "ol";
            }
            const content = trimmed.replace(/^\d+\.\s/, "");
            html += `<li>${processInline(content)}</li>\n`;
        } else if (trimmed.startsWith("> ")) {
            closeList();
            closeParagraph();
            const content = trimmed.slice(2);
            html += `<blockquote>${processInline(content)}</blockquote>\n`;
        } else if (trimmed.startsWith("```")) {
            // For simplicity, assume single line code blocks or skip
            continue;
        } else {
            closeList();
            if (currentParagraph) {
                currentParagraph += " " + trimmed;
            } else {
                currentParagraph = trimmed;
            }
        }
    }

    closeList();
    closeParagraph();

    return html.trim();
}
