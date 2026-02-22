/**
 * Auto-generate sitemap.xml from blog posts and pages.
 * Run: npx tsx scripts/generate-sitemap.ts
 * 
 * This script reads blogPosts data and static pages to produce
 * a complete sitemap.xml in the public/ directory.
 */

// Static pages with their priorities and changefreq
const DOMAIN = "https://theangelnumber333.com";

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/blogs", priority: "0.9", changefreq: "weekly" },
  { path: "/author", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-and-conditions", priority: "0.3", changefreq: "yearly" },
  { path: "/disclaimer", priority: "0.3", changefreq: "yearly" },
  { path: "/cookie-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/affiliate-disclosure", priority: "0.3", changefreq: "yearly" },
];

// Blog slugs - add new blog slugs here and re-run to update sitemap
const blogSlugs = [
  "angel-number-111", "angel-number-222", "angel-number-444", "angel-number-555",
  "angel-number-777", "angel-number-888", "angel-number-999",
  "333-meaning-after-breakup", "333-meaning-in-career", "angel-numbers-manifestation-guide",
  "angel-number-666", "angel-number-000",
  "angel-number-11", "angel-number-22", "angel-number-33", "angel-number-44",
  "angel-number-55", "angel-number-66", "angel-number-77", "angel-number-88", "angel-number-99",
  "angel-number-1111", "angel-number-2222", "angel-number-3333", "angel-number-4444",
  "angel-number-5555", "angel-number-6666", "angel-number-7777", "angel-number-8888",
  "angel-number-9999", "angel-number-0000",
  "angel-number-1010", "angel-number-1212", "angel-number-1234", "angel-number-1313",
  "angel-number-1414", "angel-number-1515", "angel-number-1616", "angel-number-1717",
  "angel-number-1818", "angel-number-1919", "angel-number-2020", "angel-number-2121",
  "angel-number-2323", "angel-number-1122", "angel-number-2233", "angel-number-3344",
  "angel-number-4455", "angel-number-5566", "angel-number-6677", "angel-number-7788", "angel-number-8899",
  "333-meaning-in-love", "333-meaning-twin-flame", "333-meaning-money", "333-meaning-pregnancy",
  "333-meaning-bible", "333-meaning-health", "333-meaning-manifestation", "333-meaning-friendship",
  "333-meaning-in-dreams",
  "111-meaning-in-love", "111-meaning-twin-flame", "222-meaning-in-love", "222-meaning-twin-flame",
  "444-meaning-in-love", "444-meaning-twin-flame", "555-meaning-in-love", "555-meaning-twin-flame",
  "777-meaning-in-love", "777-meaning-twin-flame", "888-meaning-in-love", "888-meaning-money",
  "999-meaning-in-love", "999-meaning-twin-flame",
  "seeing-angel-numbers-everyday", "angel-numbers-and-love", "angel-numbers-and-money",
  "angel-numbers-and-career", "angel-numbers-twin-flame-guide", "angel-numbers-biblical-meaning",
  "how-to-interpret-angel-numbers", "angel-numbers-and-chakras", "angel-numbers-and-meditation",
  "angel-number-sequences-guide", "angel-numbers-and-astrology", "repeating-numbers-meaning",
  "mirror-numbers-meaning", "angel-numbers-and-tarot", "angel-numbers-and-crystals",
  "angel-numbers-for-beginners", "angel-numbers-and-zodiac", "angel-numbers-and-numerology",
  "angel-numbers-complete-guide",
];

const today = new Date().toISOString().split("T")[0];

function generateSitemap(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const page of staticPages) {
    xml += `  <url><loc>${DOMAIN}${page.path}</loc><lastmod>${today}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>\n`;
  }

  for (const slug of blogSlugs) {
    xml += `  <url><loc>${DOMAIN}/${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
  }

  xml += `</urlset>`;
  return xml;
}

// Write to public/sitemap.xml
import { writeFileSync } from "fs";
import { resolve } from "path";

const sitemap = generateSitemap();
writeFileSync(resolve(__dirname, "../public/sitemap.xml"), sitemap, "utf-8");
console.log("✅ sitemap.xml generated successfully!");
