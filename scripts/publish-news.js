/*
  Run this script to mark a news item as published.
  Usage: node scripts/publish-news.js <slug>
*/

require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function run() {
  const slug = process.argv[2];
  if (!slug) {
    console.error('Usage: node scripts/publish-news.js <slug>');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || undefined);

  const res = await db
    .collection('news')
    .updateOne({ slug }, { $set: { status: 'published' } });

  console.log('matched', res.matchedCount, 'modified', res.modifiedCount);
  const doc = await db.collection('news').findOne({ slug });
  console.log('result:', doc);

  await client.close();
}

run().catch((err) => {
  console.error('error', err);
  process.exit(1);
});
