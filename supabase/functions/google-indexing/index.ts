import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create JWT from service account
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

  // Import the private key
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
  if (!data.access_token) {
    throw new Error(`Token error: ${JSON.stringify(data)}`);
  }
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const keyJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
    if (!keyJson) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not configured");
    }

    const serviceAccount = JSON.parse(keyJson);
    const accessToken = await getAccessToken(serviceAccount);

    // Default URLs from sitemap
    const DOMAIN = "https://www.theangelnumber333.com";

    const body = await req.json().catch(() => ({}));
    let urls: string[] = body.urls || [];

    // If no URLs provided, use all blog URLs
    if (urls.length === 0) {
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

      // Also add static pages
      urls = [
        DOMAIN + "/",
        DOMAIN + "/blogs",
        DOMAIN + "/author",
        ...blogSlugs.map(s => `${DOMAIN}/${s}`),
      ];
    }

    // Google allows 200 requests per day. Process in batches.
    const results: any[] = [];
    const batchSize = 10;
    
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(url => submitUrl(accessToken, url).catch(err => ({
          url,
          status: "error",
          response: err.message,
        })))
      );
      results.push(...batchResults);
      
      // Small delay between batches
      if (i + batchSize < urls.length) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    const successful = results.filter(r => r.status === 200).length;
    const failed = results.filter(r => r.status !== 200).length;

    return new Response(
      JSON.stringify({
        message: `Submitted ${urls.length} URLs. Success: ${successful}, Failed: ${failed}`,
        total: urls.length,
        successful,
        failed,
        results,
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
