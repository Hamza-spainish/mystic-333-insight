/**
 * Auto-generate sitemap.xml from blog posts and pages.
 * Run: npx tsx scripts/generate-sitemap.ts
 * 
 * This script reads all URLs and produces a complete sitemap.xml
 * organized by section with comments and creation dates.
 * 
 * Last updated: 2026-03-02
 * Total URLs: 270+
 */

const DOMAIN = "https://www.theangelnumber333.com";

// ============================================================
// SECTION 1: HOMEPAGE & MAIN PAGES
// Created: 2026-01-10 | Core site pages
// ============================================================
const homepagePages = [
  { path: "/", priority: "1.0", changefreq: "weekly", lastmod: "2026-03-02", note: "Homepage" },
  { path: "/blogs", priority: "0.9", changefreq: "weekly", lastmod: "2026-03-02", note: "Blog listing page" },
];

// ============================================================
// SECTION 2: AUTHOR & ABOUT PAGES
// Created: 2026-01-10 | About, Author, Contact
// ============================================================
const aboutPages = [
  { path: "/author", priority: "0.7", changefreq: "monthly", lastmod: "2026-02-15", note: "Author - Daniel Carter" },
  { path: "/about-us", priority: "0.6", changefreq: "monthly", lastmod: "2026-02-15", note: "About Us page" },
  { path: "/contact-us", priority: "0.5", changefreq: "monthly", lastmod: "2026-02-15", note: "Contact Us page" },
  { path: "/daniel-carter-numerology-education-spiritual-journey", priority: "0.7", changefreq: "monthly", lastmod: "2026-02-20", note: "Author detailed bio" },
];

// ============================================================
// SECTION 3: LEGAL PAGES
// Created: 2026-01-10 | Privacy, Terms, Policies
// ============================================================
const legalPages = [
  { path: "/adsense-policy", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-15", note: "AdSense Policy" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-15", note: "Privacy Policy" },
  { path: "/terms-and-conditions", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-15", note: "Terms & Conditions" },
  { path: "/disclaimer", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-15", note: "Disclaimer" },
  { path: "/cookie-policy", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-15", note: "Cookie Policy" },
  { path: "/affiliate-disclosure", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-15", note: "Affiliate Disclosure" },
];

// ============================================================
// SECTION 4: CORE ANGEL NUMBER BLOGS (Single & Triple Digit)
// Created: 2026-01-15 | Main angel number guides 000-999
// ============================================================
const coreAngelNumberSlugs = [
  // Triple digit angel numbers (Created: 2026-01-15)
  "angel-number-111", "angel-number-222", "angel-number-444", "angel-number-555",
  "angel-number-666", "angel-number-777", "angel-number-888", "angel-number-999",
  "angel-number-000",
];

// ============================================================
// SECTION 5: DOUBLE DIGIT ANGEL NUMBERS
// Created: 2026-01-20 | Master numbers & double digits 11-99
// ============================================================
const doubleDigitSlugs = [
  "angel-number-11", "angel-number-22", "angel-number-33", "angel-number-44",
  "angel-number-55", "angel-number-66", "angel-number-77", "angel-number-88", "angel-number-99",
];

// ============================================================
// SECTION 6: QUADRUPLE DIGIT ANGEL NUMBERS
// Created: 2026-01-22 | 4-digit sequences 0000-9999
// ============================================================
const quadDigitSlugs = [
  "angel-number-1111", "angel-number-2222", "angel-number-3333", "angel-number-4444",
  "angel-number-5555", "angel-number-6666", "angel-number-7777", "angel-number-8888",
  "angel-number-9999", "angel-number-0000",
];

// ============================================================
// SECTION 7: PATTERN & SEQUENCE ANGEL NUMBERS
// Created: 2026-01-25 | Mixed sequences 1010, 1212, etc.
// ============================================================
const patternSlugs = [
  "angel-number-1010", "angel-number-1212", "angel-number-1234", "angel-number-1313",
  "angel-number-1414", "angel-number-1515", "angel-number-1616", "angel-number-1717",
  "angel-number-1818", "angel-number-1919", "angel-number-2020", "angel-number-2121",
  "angel-number-2323", "angel-number-1122", "angel-number-2233", "angel-number-3344",
  "angel-number-4455", "angel-number-5566", "angel-number-6677", "angel-number-7788", "angel-number-8899",
];

// ============================================================
// SECTION 8: 333-SPECIFIC MEANING BLOGS
// Created: 2026-01-28 | All 333-related topic posts
// ============================================================
const meaning333Slugs = [
  // 333 core meanings
  "333-meaning-in-love", "333-meaning-twin-flame", "333-meaning-money", "333-meaning-pregnancy",
  "333-meaning-bible", "333-meaning-health", "333-meaning-manifestation", "333-meaning-friendship",
  "333-meaning-in-dreams", "333-meaning-after-breakup", "333-meaning-in-career",
  // 333 deep-dive topics (Created: 2026-02-01)
  "what-does-333-mean", "333-love-and-relationships", "333-career-and-success",
  "why-you-keep-seeing-333", "333-twin-flame-connection-reunion", "333-money-and-abundance",
  "333-personal-growth", "333-spiritual-significance-everywhere", "333-new-beginnings",
  "333-life-purpose", "333-numerology-powerful-number", "333-ascended-masters-connection",
  "333-master-number-numerology", "333-symbolism-spiritual-realm", "333-hidden-messages",
  "333-twin-flame-near", "333-soulmates-meaning", "333-romantic-relationships-angels",
  "333-love-manifestation", "333-healthy-relationships", "333-career-path-guide",
  "333-entrepreneurs-business", "333-motivation-productivity", "333-financial-abundance-guide",
  "333-achieving-goals", "333-life-transitions", "333-feeling-stuck", "333-life-decisions",
  "333-spiritual-awakening-signs", "333-before-big-changes", "333-twin-flame-separation",
  "333-twin-flame-reunion-signs", "333-soul-mission", "333-karmic-relationships",
  "333-spiritual-partner", "333-manifest-desires", "333-daily-life-meaning",
  "333-after-meditation-prayer", "333-stay-positive-focused", "333-spiritual-practices-energy",
  "333-real-life-stories", "333-during-hard-times", "333-thinking-of-someone",
  "333-messages-from-angels", "333-emotional-healing", "333-mental-spiritual-wellbeing",
  "333-stress-anxiety-relief", "333-self-love-inner-peace", "333-healing-energy",
  "333-how-to-respond", "333-bible-references", "333-astrology-connection",
  "333-meditation-mindfulness", "333-attract-positive-energy", "333-fun-facts",
  "333-memes-spiritual-humor", "333-popular-culture-movies", "333-journal-ideas",
  "333-social-media-messages",
];

// ============================================================
// SECTION 9: LOVE & TWIN FLAME MEANING BLOGS
// Created: 2026-02-01 | Number-specific love/twin flame posts
// ============================================================
const loveTwinFlameSlugs = [
  "111-meaning-in-love", "111-meaning-twin-flame", "222-meaning-in-love", "222-meaning-twin-flame",
  "444-meaning-in-love", "444-meaning-twin-flame", "555-meaning-in-love", "555-meaning-twin-flame",
  "777-meaning-in-love", "777-meaning-twin-flame", "888-meaning-in-love", "888-meaning-money",
  "999-meaning-in-love", "999-meaning-twin-flame",
];

// ============================================================
// SECTION 10: GENERAL ANGEL NUMBER GUIDES
// Created: 2026-02-05 | Thematic guides & how-tos
// ============================================================
const generalGuideSlugs = [
  "angel-numbers-manifestation-guide",
  "seeing-angel-numbers-everyday", "angel-numbers-and-love", "angel-numbers-and-money",
  "angel-numbers-and-career", "angel-numbers-twin-flame-guide", "angel-numbers-biblical-meaning",
  "how-to-interpret-angel-numbers", "angel-numbers-and-chakras", "angel-numbers-and-meditation",
  "angel-number-sequences-guide", "angel-numbers-and-astrology", "repeating-numbers-meaning",
  "mirror-numbers-meaning", "angel-numbers-and-tarot", "angel-numbers-and-crystals",
  "angel-numbers-for-beginners", "angel-numbers-and-zodiac", "angel-numbers-and-numerology",
  "angel-numbers-complete-guide",
];

// ============================================================
// SECTION 11: NUMEROLOGY STUDY POSTS
// Created: 2026-02-08 | In-depth numerology education
// ============================================================
const numerologySlugs = [
  "what-is-numerology-complete-guide", "life-path-number-meaning-guide",
  "expression-destiny-number-meaning", "soul-urge-number-hearts-desire",
  "pythagorean-vs-chaldean-numerology", "personal-year-number-numerology-cycles",
  "numerology-compatibility-relationships", "numerology-birthday-number-meaning",
  "master-numbers-11-22-33-meaning", "numerology-name-meaning-power",
  "numerology-for-business-success", "karmic-debt-numbers-numerology",
  "numerology-and-health-wellness", "numerology-house-number-meaning",
  "numerology-career-guidance-best-jobs", "chinese-numerology-lucky-numbers",
  "kabbalistic-numerology-gematria-guide", "vedic-numerology-indian-number-system",
  "numerology-and-tarot-connection", "sacred-geometry-numbers-universe",
  "numerology-moon-phases-cycles", "birthday-numerology-personality-traits",
  "numerology-and-color-vibrations", "numerology-maturity-number-guide",
  "how-to-do-numerology-reading", "numerology-and-meditation-practice",
  "numerology-predictions-2026-guide", "numerology-personality-number-meaning",
  "numerology-pinnacle-numbers-life-stages", "numerology-challenge-numbers-overcome",
];

// ============================================================
// SECTION 12: HIGH-VOLUME KEYWORD POSTS
// Created: 2026-02-10 | Targeting highest-traffic keywords
// ============================================================
const highVolumeSlugs = [
  "what-are-angel-numbers", "seeing-333-meaning", "angel-numbers-meaning-list",
];

// ============================================================
// SECTION 13: LOVE & BREAKUP HEALING POSTS
// Created: 2026-02-12 | Breakup recovery & love manifestation
// ============================================================
const loveBreakupSlugs = [
  "angel-numbers-after-breakup-healing-guide", "angel-number-333-love-soulmate-signs",
  "how-to-move-on-after-breakup-spiritual-guide", "angel-numbers-for-love-manifestation",
  "seeing-angel-numbers-with-ex-meaning",
];

// ============================================================
// SECTION 14: NEW BATCH - ADDITIONAL ANGEL NUMBERS
// Created: 2026-02-18 | 303-321 range & compound numbers
// ============================================================
const newBatchSlugs = [
  "angel-number-303", "angel-number-404", "angel-number-505", "angel-number-606",
  "angel-number-707", "angel-number-808", "angel-number-909", "angel-number-911",
  "angel-number-717", "angel-number-818", "angel-number-919", "angel-number-1001",
  "angel-number-1133", "angel-number-1144", "angel-number-1155", "angel-number-1221",
  "angel-number-2112", "angel-number-2424", "angel-number-3131", "angel-number-321",
];

// ============================================================
// SECTION 15: TRENDING TOPIC POSTS
// Created: 2026-02-22 | Currently trending angel number searches
// ============================================================
const trendingSlugs = [
  "seeing-1111-everywhere-meaning", "222-meaning-pregnancy-fertility", "444-after-breakup-meaning",
  "angel-numbers-on-clock-meaning", "why-do-i-keep-seeing-repeating-numbers",
  "1010-angel-number-meaning", "1212-angel-number-twin-flame", "what-does-444-mean-spiritually",
  "555-angel-number-meaning-change", "777-angel-number-luck-meaning", "888-angel-number-money-wealth",
  "angel-number-meaning-in-hindi", "angel-numbers-for-money-manifestation", "angel-numbers-for-love-attraction",
  "seeing-333-and-444-together", "angel-number-for-career-success", "angel-numbers-while-thinking-of-someone",
  "angel-number-for-exam-success", "angel-number-for-pregnancy-baby", "angel-number-911-spiritual-emergency",
];

// ============================================================
// SECTION 16: INFORMATIONAL & EDUCATIONAL POSTS
// Created: 2026-02-25 | Charts, calculators, guides
// ============================================================
const infoSlugs = [
  "angel-number-meaning-chart-complete", "how-to-calculate-life-path-number",
  "angel-numbers-and-sleep-dreams-guide", "angel-numbers-and-pregnancy-fertility-guide",
  "angel-numbers-and-manifestation-law-of-attraction", "angel-numbers-by-day-of-week-meaning",
  "angel-numbers-and-chakra-healing-guide", "angel-numbers-and-moon-phases-guide",
  "angel-numbers-and-crystals-gemstones-guide", "angel-numbers-and-zodiac-signs-compatibility",
  "angel-numbers-for-students-exam-success", "angel-numbers-for-new-beginnings-fresh-start",
  "angel-numbers-and-meditation-prayer-guide", "angel-numbers-and-health-wellness-body",
  "angel-numbers-and-money-wealth-abundance", "angel-numbers-and-twin-flame-stages",
  "angel-numbers-and-gratitude-practice", "angel-numbers-warning-signs-caution",
  "angel-numbers-and-pets-animals-signs", "angel-numbers-for-moving-new-home",
];

// ============================================================
// SECTION 17: EXTRA BLOG POSTS (March 2026 Batch)
// Created: 2026-03-02 | New related info articles
// ============================================================
const extraInfoSlugs = [
  "angel-numbers-and-feng-shui-guide",
  "angel-numbers-for-weight-loss-body-transformation",
  "angel-numbers-and-wedding-marriage-signs",
  "angel-numbers-and-job-interview-success",
  "angel-numbers-for-financial-freedom-wealth",
  "angel-numbers-and-parenting-children-guide",
  "angel-numbers-and-travel-adventure-signs",
  "angel-numbers-and-self-care-routine-guide",
  "angel-numbers-and-friendship-social-bonds",
  "angel-numbers-and-grief-loss-healing",
];

// ============================================================
// SITEMAP GENERATION
// ============================================================

const today = "2026-03-02";

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function generateSitemap(): string {
  const entries: SitemapEntry[] = [];

  // Add static pages
  const allStaticPages = [...homepagePages, ...aboutPages, ...legalPages];
  for (const page of allStaticPages) {
    entries.push({ loc: `${DOMAIN}${page.path}`, lastmod: page.lastmod, changefreq: page.changefreq, priority: page.priority });
  }

  // Add all blog slugs with their section dates
  const blogSections: { slugs: string[]; lastmod: string; section: string }[] = [
    { slugs: coreAngelNumberSlugs, lastmod: "2026-01-15", section: "Core Angel Numbers" },
    { slugs: doubleDigitSlugs, lastmod: "2026-01-20", section: "Double Digit" },
    { slugs: quadDigitSlugs, lastmod: "2026-01-22", section: "Quadruple Digit" },
    { slugs: patternSlugs, lastmod: "2026-01-25", section: "Pattern Sequences" },
    { slugs: meaning333Slugs, lastmod: "2026-02-01", section: "333 Meanings" },
    { slugs: loveTwinFlameSlugs, lastmod: "2026-02-01", section: "Love & Twin Flame" },
    { slugs: generalGuideSlugs, lastmod: "2026-02-05", section: "General Guides" },
    { slugs: numerologySlugs, lastmod: "2026-02-08", section: "Numerology Study" },
    { slugs: highVolumeSlugs, lastmod: "2026-02-10", section: "High Volume" },
    { slugs: loveBreakupSlugs, lastmod: "2026-02-12", section: "Love & Breakup" },
    { slugs: newBatchSlugs, lastmod: "2026-02-18", section: "New Batch" },
    { slugs: trendingSlugs, lastmod: "2026-02-22", section: "Trending" },
    { slugs: infoSlugs, lastmod: "2026-02-25", section: "Informational" },
    { slugs: extraInfoSlugs, lastmod: "2026-03-02", section: "Extra Info (March 2026)" },
  ];

  for (const section of blogSections) {
    for (const slug of section.slugs) {
      entries.push({ loc: `${DOMAIN}/${slug}`, lastmod: section.lastmod, changefreq: "monthly", priority: "0.8" });
    }
  }

  // Build XML with comments
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<!-- Sitemap for ${DOMAIN} -->\n`;
  xml += `<!-- Generated: ${today} | Total URLs: ${entries.length} -->\n`;
  xml += `<!-- Sections: Homepage, About, Legal, Core Numbers, Double Digit, Quad Digit, Patterns, 333 Meanings, Love/Twin Flame, Guides, Numerology, High Volume, Love/Breakup, New Batch, Trending, Info, Extra Info -->\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

  // Homepage & Main
  xml += `  <!-- ===== HOMEPAGE & MAIN PAGES (Created: 2026-01-10) ===== -->\n`;
  for (const page of homepagePages) {
    xml += `  <url><loc>${DOMAIN}${page.path}</loc><lastmod>${page.lastmod}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>\n`;
  }

  // About
  xml += `\n  <!-- ===== AUTHOR & ABOUT PAGES (Created: 2026-01-10) ===== -->\n`;
  for (const page of aboutPages) {
    xml += `  <url><loc>${DOMAIN}${page.path}</loc><lastmod>${page.lastmod}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>\n`;
  }

  // Legal
  xml += `\n  <!-- ===== LEGAL PAGES (Created: 2026-01-10) ===== -->\n`;
  for (const page of legalPages) {
    xml += `  <url><loc>${DOMAIN}${page.path}</loc><lastmod>${page.lastmod}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>\n`;
  }

  // Blog sections with comments
  for (const section of blogSections) {
    xml += `\n  <!-- ===== ${section.section.toUpperCase()} BLOGS (Created: ${section.lastmod}) | ${section.slugs.length} posts ===== -->\n`;
    for (const slug of section.slugs) {
      xml += `  <url><loc>${DOMAIN}/${slug}</loc><lastmod>${section.lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
    }
  }

  xml += `\n</urlset>`;
  return xml;
}

// Write to public/sitemap.xml
import { writeFileSync } from "fs";
import { resolve } from "path";

const sitemap = generateSitemap();
writeFileSync(resolve(__dirname, "../public/sitemap.xml"), sitemap, "utf-8");
console.log("✅ sitemap.xml generated successfully!");
