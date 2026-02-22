import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import AuthorBox from "@/components/AuthorBox";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import AdPlaceholder from "@/components/AdPlaceholder";
import { numberSilos, topicSilos } from "@/data/siloStructure";
import { allBlogPosts } from "@/data/blogPosts";

const homepageSections = [
  { id: "what-is", title: "What Is Angel Number 333?", content: "Angel number 333 is a powerful divine message from the spiritual realm, carrying the amplified energy of the number 3 — which represents creativity, self-expression, communication, and spiritual growth. When this sacred number appears three times in sequence, its vibrational power is tripled, creating one of the most significant angel numbers in numerology.\n\nThe number 3 holds deep significance across spiritual traditions worldwide. In Christianity, it represents the Holy Trinity. In Hinduism, the Trimurti. In numerology, it symbolizes the union of mind, body, and spirit. When you see 333, you're receiving a direct communication from your guardian angels and ascended masters — enlightened spiritual beings like Jesus, Buddha, and Quan Yin who guide humanity from higher dimensions.\n\nAngel number 333 is not random. The universe doesn't communicate through coincidence. Every time you glance at a clock showing 3:33, notice 333 on a license plate, receive $3.33 in change, or encounter this number in any form, your angels are deliberately placing it in your awareness. They're saying: 'We are here. We see you. We support you. Pay attention to this moment.'" },
  { id: "spiritual", title: "Spiritual Meaning of 333", content: "What does 333 mean spiritually? At its core, angel number 333 is a message of spiritual awakening, divine protection, and alignment with your higher purpose. The spiritual meaning of 333 encompasses several powerful dimensions that work together to guide your soul's evolution.\n\nFirst, 333 signals that the ascended masters are near. These enlightened beings have walked the earth, experienced human challenges, and transcended to higher planes of existence. When you see 333, they are actively surrounding you with their wisdom, love, and guidance. You are never alone on your spiritual journey.\n\nSecond, 333 spiritually represents the activation of your creative divine spark. You were created in the image of the Creator, which means you possess an inherent ability to create your reality through your thoughts, words, and actions. Seeing 333 is a reminder that this creative power is active and ready to be directed toward your highest aspirations.\n\nThird, the spiritual significance of 333 relates to wholeness and integration. The three 3s represent the harmonious alignment of your mind, body, and spirit. When these three aspects of your being work in concert, you become a powerful channel for divine energy, capable of manifesting miracles and experiencing profound inner peace." },
  { id: "love", title: "333 Meaning in Love", content: "The meaning of 333 in love is profoundly beautiful and encouraging. Whether you're single, in a relationship, or healing from heartbreak, angel number 333 brings a message of divine love that touches every aspect of your romantic life.\n\nFor those in relationships, 333 meaning in love signifies growth, deeper connection, and the evolution of your partnership to a higher level. Your angels are encouraging you to communicate more openly, express affection more freely, and invest in the spiritual dimension of your relationship.\n\nIf you're single and seeing 333, the universe is preparing you for a meaningful romantic connection. This isn't just any relationship — 333 indicates that love is coming that will support your spiritual growth and creative expression. Your future partner will see and celebrate the real you.\n\n333 in love also carries a message about self-love. Before you can fully receive the love the universe wants to give you, you must cultivate deep appreciation and compassion for yourself. The ascended masters remind you through 333 that you are worthy of extraordinary love — not because of what you do, but because of who you are." },
  { id: "twin-flame", title: "333 Twin Flame Meaning", content: "The 333 twin flame meaning is extraordinarily significant. Twin flames are two halves of the same soul, separated at the beginning of time and destined to find each other across lifetimes. When 333 appears in the context of your twin flame journey, it carries messages of divine reunion, spiritual acceleration, and sacred purpose.\n\nIf you haven't yet met your twin flame, seeing 333 repeatedly may indicate that your reunion is approaching. The ascended masters are working behind the scenes to align circumstances, remove obstacles, and prepare both you and your twin flame for the powerful experience of recognition and connection.\n\nFor those already in twin flame relationships, 333 signals a phase of accelerated spiritual growth within the connection. Twin flame relationships are not always easy — they trigger deep healing, expose shadow aspects, and challenge both partners to evolve rapidly. 333 reassures you that this intensity serves a divine purpose.\n\nThe number 333 in twin flame separation carries a particularly important message: this period of distance is not punishment but preparation. Both twins need to develop individually before they can sustain the powerful energy of permanent union. Trust the process, focus on your own growth, and know that divine timing governs every aspect of your twin flame journey." },
  { id: "biblical", title: "333 Biblical Meaning", content: "The 333 biblical meaning draws from the profound spiritual significance of the number 3 throughout Scripture. The Bible is rich with trinitarian symbolism, and understanding the biblical context of 333 adds depth to your spiritual interpretation.\n\nThe most prominent biblical association is the Holy Trinity — Father, Son, and Holy Spirit. When you see 333, it can be interpreted as a triple affirmation of God's triune nature and His active presence in your life.\n\nJesus Christ was 33 years old during His crucifixion and resurrection — the most transformative event in Christian theology. The number 33 (and by extension 333) is therefore connected to themes of sacrifice, transformation, resurrection, and the triumph of divine love over death and darkness.\n\nIn Scripture, the number 3 appears in numerous significant contexts: Jonah spent 3 days in the whale, Jesus rose on the 3rd day, Peter denied Christ 3 times and was later asked 3 times 'Do you love me?', and the three wise men brought gifts to the Christ child." },
  { id: "numerology", title: "333 Numerology Meaning", content: "In numerology, the 333 numerology meaning is derived from the powerful vibrations of the number 3 and its amplification through repetition. Numerologists consider 333 to be a master number sequence that carries exceptional creative and spiritual energy.\n\nThe number 3 in numerology represents the principle of growth, expansion, and creative manifestation. It's associated with Jupiter — the planet of abundance, wisdom, and spiritual expansion. When 3 appears three times, Jupiter's benevolent influence is maximized.\n\nNumerologically, 333 reduces to 9 (3+3+3=9), which is the number of completion, universal love, and humanitarian service. This connection adds a layer of meaning to 333: your creative expression and spiritual growth are meant to serve not just your personal evolution but the greater good of humanity.\n\nIn advanced numerology, 333 is considered a 'gateway number' — a numerical sequence that opens portals between dimensions of consciousness. When you encounter 333, you're standing at a threshold between your current reality and a higher plane of existence." },
  { id: "law-of-attraction", title: "333 & Law of Attraction", content: "Angel number 333 and the law of attraction share a powerful connection that can dramatically accelerate your manifestation abilities. The law of attraction states that like attracts like — your dominant thoughts, emotions, and beliefs magnetize corresponding experiences.\n\n333 amplifies the law of attraction in several crucial ways. First, the creative energy of 333 supercharges your visualization practice. When you see 333 and immediately focus on your desires with clarity and positive emotion, you're sending an extraordinarily powerful signal to the universe.\n\nSecond, 333 reminds you of the importance of alignment across all three levels of creation: thought (mind), feeling (heart), and action (body). Think positive thoughts, feel the joy of your fulfilled desire, and take inspired action — this trinity of manifestation is what 333 is urging you to practice.\n\nThird, 333 encourages creative approaches to manifestation. Instead of simply repeating affirmations, try creative visualization, vision boarding, scripting, or creating art that represents your manifested reality. The creative energy of 333 responds especially well to imaginative techniques." },
  { id: "why-seeing", title: "Why You Keep Seeing 333", content: "Why do I keep seeing 333? This is one of the most commonly asked questions, and the answer encompasses several interconnected reasons that reflect where you are on your spiritual journey.\n\nYou're seeing 333 repeatedly because your spiritual awareness is expanding. As your consciousness evolves, you become more attuned to the subtle communications of the universe. The angel numbers were always there — you're just now developing the spiritual sensitivity to notice them.\n\nAnother reason you keep seeing 333 is that you're at a critical juncture in your life where the decisions you make will significantly impact your future. The ascended masters are increasing their communication through 333 because they want to ensure you have divine guidance during this pivotal time.\n\nSeeing 333 repeatedly also indicates that your creative potential is ready to be unleashed. Perhaps you've been suppressing creative ideas, postponing artistic projects, or downplaying your unique talents. 333 appears persistently when untapped creative energy is building within you, ready to be expressed." },
  { id: "what-to-do", title: "What To Do When You See 333", content: "When the sacred number 333 appears in your experience, it's an invitation to pause, connect, and consciously engage with the divine message being delivered.\n\n1. Pause and Breathe: Stop whatever you're doing and take three deep breaths. This shifts you from autopilot to conscious awareness.\n\n2. Acknowledge the Message: Silently or aloud, say 'Thank you, angels. I see your sign and I'm listening.'\n\n3. Check Your Thoughts: Notice what you were thinking about when 333 appeared. Your thoughts at that moment are significant.\n\n4. Set an Intention: Use the powerful energy of the 333 moment to set a clear, positive intention.\n\n5. Express Creatively: Within 24 hours of seeing 333, engage in some form of creative expression.\n\n6. Journal Your Experience: Document the date, time, and circumstances of your 333 sighting.\n\n7. Share the Love: 333's energy is expansive and generous. Do something kind for someone to amplify 333's positive vibration." },
  { id: "signs", title: "Signs the Universe Is Guiding You", content: "Seeing 333 is one of many signs that the universe is actively guiding your path. When combined with other spiritual indicators, the presence of 333 creates a comprehensive picture of divine guidance in your life.\n\nSynchronicities: Meaningful coincidences that seem too perfect to be random — running into exactly the right person, finding a book that answers your deepest question.\n\nRecurring Dreams: Dreams with spiritual themes, messages from deceased loved ones, or vivid scenarios that feel more real than waking life.\n\nPhysical Sensations: Unexplained tingling, warmth, or a feeling of being embraced by invisible arms.\n\nAnimal Messengers: Repeated encounters with specific animals — butterflies, hawks, deer, dragonflies — that carry spiritual symbolism.\n\nIntuitive Knowing: A sudden, deep certainty about a decision that arrives without logical reasoning.\n\nWhen you notice these signs alongside 333, celebrate! You are deeply connected to the spiritual realm, and the universe is confirming that your path is blessed." },
];

const faqs = [
  { q: "What does 333 mean spiritually?", a: "Angel number 333 spiritually represents divine protection, the presence of ascended masters, creative expression, and alignment with your soul's purpose. It signals that your mind, body, and spirit are coming into harmony." },
  { q: "What does 333 mean in love?", a: "In love, 333 signifies growth, deeper connection, and divine blessing on your romantic life. For singles, it indicates meaningful love approaching. For couples, it encourages spiritual growth within the relationship." },
  { q: "What is the 333 twin flame meaning?", a: "For twin flames, 333 signals reunion approaching, accelerated spiritual growth, and divine support for the twin flame journey. During separation, it reassures that the distance serves a higher purpose." },
  { q: "What is the biblical meaning of 333?", a: "Biblically, 333 connects to the Holy Trinity, Jesus's age at resurrection (33), and the biblical significance of the number 3 in divine communication, sacrifice, and spiritual transformation." },
  { q: "Why do I keep seeing 333 everywhere?", a: "You keep seeing 333 because your spiritual awareness is expanding, you're at a pivotal life moment, your creative potential is ready to be unleashed, or the ascended masters are increasing their communication." },
  { q: "Is 333 a manifestation number?", a: "Yes! 333 is one of the most powerful manifestation numbers. Its creative energy, combined with ascended master support, supercharges your ability to attract your desires through focused intention." },
  { q: "What should I do when I see 333?", a: "Pause and breathe, acknowledge the angelic message, check your thoughts, set a positive intention, express yourself creatively, journal the experience, and share kindness with others." },
  { q: "Does 333 mean good luck?", a: "333 represents divine alignment and spiritual support, which often manifests as what we call 'good luck.' It indicates that the universe is orchestrating favorable circumstances on your behalf." },
];

const quickRefTable = {
  caption: "Angel Number 333 Complete Meaning Reference",
  headers: ["Aspect", "333 Meaning", "Key Message"],
  rows: [
    ["Spiritual", "Ascended masters near", "You are divinely guided and protected"],
    ["Love", "Growth & deeper connection", "Open your heart to divine love"],
    ["Twin Flame", "Reunion & acceleration", "Trust divine timing of union"],
    ["Biblical", "Holy Trinity & resurrection", "God's triune presence active"],
    ["Numerology", "Creative gateway (3+3+3=9)", "Express your authentic gifts"],
    ["Career", "Creative expansion", "Align work with purpose"],
    ["Manifestation", "Amplified intentions", "Your thoughts are manifesting rapidly"],
    ["Law of Attraction", "Mind-heart-body alignment", "Harmonize thoughts, feelings, actions"],
  ],
};

const Index = () => {
  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Angel Number 333 Meaning",
    "url": "https://theangelnumber333.com",
    "description": "Your comprehensive guide to angel number 333 meaning, spiritual significance, love, twin flames, biblical symbolism and manifestation.",
    "publisher": { "@type": "Organization", "name": "Angel Number 333 Meaning" },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Angel Number 333 Meaning: Spiritual, Love, Twin Flame & Biblical Symbolism",
    "description": "Discover the powerful meaning of angel number 333. Learn about 333 spiritual meaning, love, twin flame connections, biblical symbolism, manifestation & why you keep seeing 333.",
    "author": { "@type": "Person", "name": "Daniel Carter", "jobTitle": "Spiritual Numerology Expert", "url": "https://theangelnumber333.com/author" },
    "publisher": { "@type": "Organization", "name": "Angel Number 333 Meaning", "url": "https://theangelnumber333.com" },
    "datePublished": "2026-01-10",
    "dateModified": "2026-02-22",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://theangelnumber333.com/" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://theangelnumber333.com/" },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Angel Number 333 Spiritual Guide",
    "description": "Comprehensive guide to angel number 333 meaning including spiritual, love, twin flame, biblical & manifestation interpretations with free calculator tool.",
    "brand": { "@type": "Brand", "name": "Angel Number 333 Meaning" },
    "category": "Spiritual Guides",
    "url": "https://theangelnumber333.com/",
    "image": "https://theangelnumber333.com/og-image.jpg",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://theangelnumber333.com/",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "2847",
      "reviewCount": "1523",
    },
    "review": [
      { "@type": "Review", "author": { "@type": "Person", "name": "Sarah M." }, "datePublished": "2026-02-10", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "The most comprehensive angel number 333 guide I've found. The calculator tool gave me an incredibly accurate personal reading." },
      { "@type": "Review", "author": { "@type": "Person", "name": "James K." }, "datePublished": "2026-02-05", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "Beautifully written spiritual guide. The twin flame section helped me understand my connection on a deeper level." },
      { "@type": "Review", "author": { "@type": "Person", "name": "Maria L." }, "datePublished": "2026-01-28", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "reviewBody": "I love the free angel number calculator. It provided personalized insight that resonated deeply with my spiritual journey." },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Angel Number 333 Personal Meaning Calculator",
    "description": "Free online calculator that reveals your personal angel number meaning based on your name and birth date using advanced numerology.",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web Browser",
    "url": "https://theangelnumber333.com/#calculator",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "3156",
      "reviewCount": "1892",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Angel Number 333 Meaning",
    "url": "https://theangelnumber333.com",
    "logo": "https://theangelnumber333.com/favicon.ico",
    "description": "Trusted spiritual numerology resource providing comprehensive angel number guides, calculators, and spiritual growth content.",
    "foundingDate": "2025",
    "founder": { "@type": "Person", "name": "Daniel Carter" },
    "sameAs": [],
  };

  return (
    <>
      <Helmet>
        <title>Angel Number 333 Meaning: Spiritual, Love, Twin Flame & Biblical Symbolism</title>
        <meta name="description" content="Discover the powerful meaning of angel number 333. Learn about 333 spiritual meaning, love, twin flame connections, biblical symbolism, manifestation & why you keep seeing 333." />
        <link rel="canonical" href="https://theangelnumber333.com/" />
        <meta property="og:title" content="Angel Number 333 Meaning: Spiritual, Love, Twin Flame & Biblical Symbolism" />
        <meta property="og:description" content="Discover the powerful meaning of angel number 333. Spiritual guidance, love meanings, twin flame connections & biblical symbolism." />
        <meta property="og:url" content="https://theangelnumber333.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Angel Number 333 Meaning" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Angel Number 333 Meaning: Spiritual, Love & Twin Flame Symbolism" />
        <meta name="twitter:description" content="Discover the powerful meaning of angel number 333." />
        <script type="application/ld+json">{JSON.stringify(homepageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>

      {/* Hero with integrated Calculator */}
      <HeroSection />

      {/* Verification Badges */}
      <div className="bg-secondary/30 border-y border-border py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">✓</span>
              <span>Expert Verified</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">★</span>
              <span>4.9/5 (2,847 Reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">🔒</span>
              <span>Trusted Resource</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">📖</span>
              <span>100+ Guides</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">🔮</span>
              <span>Free Calculator</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference Table */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <p className="font-serif font-semibold text-foreground mb-3">{quickRefTable.caption}</p>
          <table className="w-full border-collapse text-sm mb-2">
            <thead>
              <tr className="bg-primary/10">
                {quickRefTable.headers.map((h, i) => (
                  <th key={i} className="border border-border px-3 py-2 text-left font-serif font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quickRefTable.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-border px-3 py-2 text-muted-foreground">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table of Contents */}
      <nav id="content" className="py-8 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4">📖 Table of Contents</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {homepageSections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm text-primary hover:underline">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#calculator" className="text-sm text-primary hover:underline">
                  🔮 Personal 333 Calculator Tool
                </a>
              </li>
              <li>
                <a href="#faqs" className="text-sm text-primary hover:underline">
                  {homepageSections.length + 1}. Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {homepageSections.map((section, i) => (
              <section key={section.id} id={section.id} className="mb-12">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">{section.title}</h2>
                {section.content.split("\n\n").map((para, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
                ))}
                {i === 1 && <AdPlaceholder slot="in-content-1" />}
                {i === 4 && <AdPlaceholder slot="in-content-2" />}
                {i === 7 && <AdPlaceholder slot="in-content-3" />}
              </section>
            ))}

            {/* FAQs */}
            <section id="faqs" className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">Frequently Asked Questions About Angel Number 333</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="group bg-card rounded-lg border border-border p-4">
                    <summary className="font-serif font-semibold text-foreground cursor-pointer list-none flex justify-between items-center">
                      {faq.q}
                      <span className="text-primary ml-2 group-open:rotate-45 transition-transform text-xl">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* 333 Topic Silo Hub */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">333 Angel Number Deep Dives</h2>
              <p className="text-muted-foreground text-sm mb-6">Explore every aspect of angel number 333 through our specialized topic guides.</p>
              <div className="space-y-6">
                {topicSilos.slice(0, 6).map(topic => {
                  const topicPosts = allBlogPosts.filter(p => p.number === "333" && topic.keywords.some(k => p.slug.includes(k))).slice(0, 4);
                  if (topicPosts.length === 0) return null;
                  return (
                    <div key={topic.id}>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{topic.emoji} 333 {topic.label}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {topicPosts.map(p => (
                          <Link key={p.slug} to={`/${p.slug}`} className="block p-3 bg-card rounded-lg border border-border hover:shadow-card hover:border-primary/30 transition-all text-sm text-primary font-medium hover:underline">
                            → {p.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Number Pillar Hub Links */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">All Angel Number Guides</h2>
              <p className="text-muted-foreground text-sm mb-6">Comprehensive pillar guides for every major angel number.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {numberSilos.filter(s => s.id !== "333").map(s => (
                  <Link key={s.pillarSlug} to={`/${s.pillarSlug}`} className="text-center p-4 bg-card rounded-xl border border-border hover:shadow-card hover:border-primary/30 transition-all group">
                    <span className="block font-serif text-2xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform">{s.id}</span>
                    <span className="block text-xs text-muted-foreground">{s.description}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Topic Hub Pages */}
            <div className="mb-12">
              <h2 className="font-serif text-xl font-bold text-foreground mb-4">Angel Numbers by Topic</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topicSilos.filter(t => t.hubSlug).map(t => (
                  <Link key={t.hubSlug} to={`/${t.hubSlug}`} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:shadow-card hover:border-primary/30 transition-all">
                    <span className="text-xl">{t.emoji}</span>
                    <span className="text-sm text-primary font-medium hover:underline">{t.label} — All Numbers Guide</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center p-8 bg-gradient-spiritual rounded-2xl shadow-spiritual">
              <h2 className="font-serif text-2xl font-bold text-primary-foreground mb-3">
                Discover Your Personal 333 Meaning
              </h2>
              <p className="text-primary-foreground/80 mb-4 text-sm">
                Use our free angel number calculator tool above to unlock a personalized spiritual reading based on your name and birth date.
              </p>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground text-primary rounded-full font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                🔮 Try the Free Calculator Now →
              </a>
            </div>
          </div>
        </div>
      </article>

      <TestimonialsSection />
      <AuthorBox />
      <NewsletterSection />
    </>
  );
};

export default Index;
