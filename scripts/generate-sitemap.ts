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
  "angel-number-111",
  "angel-number-222",
  "angel-number-444",
  "angel-number-555",
  "angel-number-777",
  "angel-number-888",
  "angel-number-999",
  "333-meaning-after-breakup",
  "333-meaning-in-career",
  "angel-numbers-manifestation-guide",
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
