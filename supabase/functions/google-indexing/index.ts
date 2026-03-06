import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function createJWT(serviceAccount: any): Promise<string> {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: any) =>
    btoa(JSON.stringify(obj)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const headerB64 = encode(header);
  const claimsB64 = encode(claims);
  const unsignedToken = `${headerB64}.${claimsB64}`;

  const pemContents = serviceAccount.private_key
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\n/g, "");

  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsignedToken)
  );

  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  return `${unsignedToken}.${sigB64}`;
}

async function getAccessToken(serviceAccount: any): Promise<string> {
  const jwt = await createJWT(serviceAccount);
  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const data = await resp.json();
  if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function submitUrl(accessToken: string, url: string, type: string = "URL_UPDATED") {
  const resp = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ url, type }),
  });
  const data = await resp.json();
  return { url, status: resp.status, response: data };
}

const DOMAIN = "https://www.theangelnumber333.com";

// All 282 sitemap slugs organized by section
const ALL_SLUGS: string[] = [
  // Section 1: Homepage & Main Pages
  "", "blogs",
  // Section 2: Author & About Pages
  "author", "about-us", "contact-us", "daniel-carter-numerology-education-spiritual-journey",
  // Section 3: Legal Pages
  "adsense-policy", "privacy-policy", "terms-and-conditions", "disclaimer", "cookie-policy", "affiliate-disclosure",
  // Section 4: Core Angel Numbers 000-999
  "angel-number-111", "angel-number-222", "angel-number-444", "angel-number-555",
  "angel-number-666", "angel-number-777", "angel-number-888", "angel-number-999", "angel-number-000",
  // Section 5: Double Digit 11-99
  "angel-number-11", "angel-number-22", "angel-number-33", "angel-number-44",
  "angel-number-55", "angel-number-66", "angel-number-77", "angel-number-88", "angel-number-99",
  // Section 6: Quadruple Digit 0000-9999
  "angel-number-1111", "angel-number-2222", "angel-number-3333", "angel-number-4444",
  "angel-number-5555", "angel-number-6666", "angel-number-7777", "angel-number-8888",
  "angel-number-9999", "angel-number-0000",
  // Section 7: Pattern & Sequence Numbers
  "angel-number-1010", "angel-number-1212", "angel-number-1234", "angel-number-1313",
  "angel-number-1414", "angel-number-1515", "angel-number-1616", "angel-number-1717",
  "angel-number-1818", "angel-number-1919", "angel-number-2020", "angel-number-2121",
  "angel-number-2323", "angel-number-1122", "angel-number-2233", "angel-number-3344",
  "angel-number-4455", "angel-number-5566", "angel-number-6677", "angel-number-7788", "angel-number-8899",
  // Section 8: 333-Specific Meaning Blogs (Core + Deep-Dive)
  "333-meaning-in-love", "333-meaning-twin-flame", "333-meaning-money", "333-meaning-pregnancy",
  "333-meaning-bible", "333-meaning-health", "333-meaning-manifestation", "333-meaning-friendship",
  "333-meaning-in-dreams", "333-meaning-after-breakup", "333-meaning-in-career",
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
  "333-memes-spiritual-humor", "333-popular-culture-movies", "333-journal-ideas", "333-social-media-messages",
  // Section 9: Love & Twin Flame Meanings
  "111-meaning-in-love", "111-meaning-twin-flame", "222-meaning-in-love", "222-meaning-twin-flame",
  "444-meaning-in-love", "444-meaning-twin-flame", "555-meaning-in-love", "555-meaning-twin-flame",
  "777-meaning-in-love", "777-meaning-twin-flame", "888-meaning-in-love", "888-meaning-money",
  "999-meaning-in-love", "999-meaning-twin-flame",
  // Section 10: General Angel Number Guides
  "angel-numbers-manifestation-guide", "seeing-angel-numbers-everyday", "angel-numbers-and-love",
  "angel-numbers-and-money", "angel-numbers-and-career", "angel-numbers-twin-flame-guide",
  "angel-numbers-biblical-meaning", "how-to-interpret-angel-numbers", "angel-numbers-and-chakras",
  "angel-numbers-and-meditation", "angel-number-sequences-guide", "angel-numbers-and-astrology",
  "repeating-numbers-meaning", "mirror-numbers-meaning", "angel-numbers-and-tarot",
  "angel-numbers-and-crystals", "angel-numbers-for-beginners", "angel-numbers-and-zodiac",
  "angel-numbers-and-numerology", "angel-numbers-complete-guide",
  // Section 11: Numerology Study Posts
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
  // Section 12: High-Volume Keyword Posts
  "what-are-angel-numbers", "seeing-333-meaning", "angel-numbers-meaning-list",
  // Section 13: Love & Breakup Healing Posts
  "angel-numbers-after-breakup-healing-guide", "angel-number-333-love-soulmate-signs",
  "how-to-move-on-after-breakup-spiritual-guide", "angel-numbers-for-love-manifestation",
  "seeing-angel-numbers-with-ex-meaning",
  // Section 14: New Batch - Additional Numbers
  "angel-number-303", "angel-number-404", "angel-number-505", "angel-number-606",
  "angel-number-707", "angel-number-808", "angel-number-909", "angel-number-911",
  "angel-number-717", "angel-number-818", "angel-number-919", "angel-number-1001",
  "angel-number-1133", "angel-number-1144", "angel-number-1155", "angel-number-1221",
  "angel-number-2112", "angel-number-2424", "angel-number-3131", "angel-number-321",
  // Section 15: Trending Topic Posts
  "seeing-1111-everywhere-meaning", "222-meaning-pregnancy-fertility",
  "444-after-breakup-meaning", "angel-numbers-on-clock-meaning",
  "why-do-i-keep-seeing-repeating-numbers", "1010-angel-number-meaning",
  "1212-angel-number-twin-flame", "what-does-444-mean-spiritually",
  "555-angel-number-meaning-change", "777-angel-number-luck-meaning",
  "888-angel-number-money-wealth", "angel-number-meaning-in-hindi",
  "angel-numbers-for-money-manifestation", "angel-numbers-for-love-attraction",
  "seeing-333-and-444-together", "angel-number-for-career-success",
  "angel-numbers-while-thinking-of-someone", "angel-number-for-exam-success",
  "angel-number-for-pregnancy-baby", "angel-number-911-spiritual-emergency",
  // Section 16: Informational & Educational Posts
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
  // Section 17: Extra Info Blog Posts
  "angel-numbers-and-feng-shui-guide", "angel-numbers-for-weight-loss-body-transformation",
  "angel-numbers-and-wedding-marriage-signs", "angel-numbers-and-job-interview-success",
  "angel-numbers-for-financial-freedom-wealth", "angel-numbers-and-parenting-children-guide",
  "angel-numbers-and-travel-adventure-signs", "angel-numbers-and-self-care-routine-guide",
  "angel-numbers-and-friendship-social-bonds", "angel-numbers-and-grief-loss-healing",
  // Section 18: New Info Blog Posts
  "angel-numbers-and-retirement-planning-guide", "angel-numbers-and-creativity-art-inspiration",
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const keyJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
    if (!keyJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not configured");

    const serviceAccount = JSON.parse(keyJson);
    const accessToken = await getAccessToken(serviceAccount);

    const body = await req.json().catch(() => ({}));
    let urls: string[] = body.urls || [];

    // If no URLs provided, use all sitemap URLs
    if (urls.length === 0) {
      urls = ALL_SLUGS.map(s => s === "" ? `${DOMAIN}/` : `${DOMAIN}/${s}`);
    }

    // Google allows 200 requests per day. Process in batches of 10.
    const results: any[] = [];
    const batchSize = 10;

    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(url => submitUrl(accessToken, url).catch(err => ({
          url, status: "error", response: err.message,
        })))
      );
      results.push(...batchResults);
      if (i + batchSize < urls.length) await new Promise(r => setTimeout(r, 500));
    }

    const successful = results.filter(r => r.status === 200).length;
    const failed = results.filter(r => r.status !== 200).length;

    return new Response(
      JSON.stringify({
        message: `Submitted ${urls.length} URLs. Success: ${successful}, Failed: ${failed}`,
        total: urls.length, successful, failed, results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
