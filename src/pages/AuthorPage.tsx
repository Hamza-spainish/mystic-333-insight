import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight, User, BookOpen, Award, Heart, Star } from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import { allBlogPosts } from "@/data/blogPosts";

const AuthorPage = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Daniel Carter",
    "jobTitle": "Spiritual Numerology Expert",
    "description": "Daniel Carter is a renowned spiritual numerology expert with over eight years of dedicated practice in angel number interpretation, sacred geometry, and spiritual counseling.",
    "url": "https://www.theangelnumber333.com/author",
    "sameAs": [],
    "knowsAbout": ["Angel Numbers", "Numerology", "Spiritual Counseling", "Sacred Geometry", "Manifestation"],
    "worksFor": {
      "@type": "Organization",
      "name": "Angel Number 333 Meaning",
      "url": "https://www.theangelnumber333.com"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.theangelnumber333.com/" },
      { "@type": "ListItem", "position": 2, "name": "Daniel Carter", "item": "https://www.theangelnumber333.com/author" },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Daniel Carter – Spiritual Numerology Expert | Angel Number 333",
    "description": "Meet Daniel Carter, spiritual numerology expert with 8+ years of experience in angel number interpretation and spiritual counseling.",
    "url": "https://www.theangelnumber333.com/author",
    "mainEntity": {
      "@type": "Person",
      "name": "Daniel Carter"
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Angel Number 333 Meaning",
      "url": "https://www.theangelnumber333.com"
    },
  };

  const sortedPosts = [...allBlogPosts].sort((a, b) => new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime());

  return (
    <>
      <Helmet>
        <title>Daniel Carter – Spiritual Numerology Expert | Angel Number 333</title>
        <meta name="description" content="Meet Daniel Carter, spiritual numerology expert with 8+ years of experience in angel number interpretation, sacred geometry, and spiritual counseling." />
        <link rel="canonical" href="https://www.theangelnumber333.com/author" />
        <meta property="og:title" content="Daniel Carter – Spiritual Numerology Expert" />
        <meta property="og:description" content="Meet Daniel Carter, spiritual numerology expert with 8+ years guiding thousands in understanding divine messages through numbers." />
        <meta property="og:url" content="https://www.theangelnumber333.com/author" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Angel Number 333 Meaning" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Daniel Carter – Spiritual Numerology Expert" />
        <meta name="twitter:description" content="Spiritual numerology expert with 8+ years of experience in angel number interpretation." />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8 max-w-3xl mx-auto flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Daniel Carter</span>
          </nav>

          <div className="max-w-3xl mx-auto">
            {/* Author Header */}
            <div className="bg-card rounded-2xl shadow-card border border-border p-8 md:p-10 mb-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-spiritual flex items-center justify-center flex-shrink-0">
                  <User className="h-12 w-12 text-primary-foreground" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-1">Daniel Carter</h1>
                  <p className="text-primary font-semibold mb-4">Spiritual Numerology Expert · 8+ Years Experience</p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {["Angel Numbers", "Numerology", "Sacred Geometry", "Spiritual Counseling", "Manifestation"].map(tag => (
                      <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About Daniel</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Daniel Carter is a renowned spiritual numerology expert with over eight years of dedicated practice 
                  in angel number interpretation, sacred geometry, and spiritual counseling. His journey began after 
                  a profound spiritual awakening that led him to study ancient numerological traditions across cultures.
                </p>
                <p>
                  Daniel has guided thousands of individuals worldwide in understanding the divine messages encoded in 
                  numbers, helping them unlock their spiritual potential and align with their life purpose. His work 
                  combines rigorous research with deep intuitive insight, making complex spiritual concepts accessible 
                  and actionable.
                </p>
                <p>
                  Daniel's mission is to help every soul recognize the loving guidance the universe 
                  continuously provides through the language of numbers. Through his articles, personal consultations, 
                  and free calculator tools, he empowers readers to decode angel numbers and apply their wisdom to 
                  love, career, manifestation, and spiritual growth.
                </p>
              </div>
            </section>

            {/* Highlights */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Expertise & Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, title: "Published Author", desc: `${allBlogPosts.length}+ in-depth spiritual guides and articles` },
                  { icon: Award, title: "8+ Years Experience", desc: "Dedicated practice in angel number interpretation" },
                  { icon: Heart, title: "Thousands Guided", desc: "Helped individuals worldwide unlock spiritual potential" },
                  { icon: Star, title: "Cross-Cultural Study", desc: "Ancient numerological traditions from multiple cultures" },
                ].map(item => (
                  <div key={item.title} className="bg-secondary/50 rounded-xl p-5 border border-border">
                    <item.icon className="h-6 w-6 text-primary mb-2" />
                    <h3 className="font-serif font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Articles by Author */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Articles by Daniel</h2>
              <div className="space-y-3">
                {sortedPosts.map(post => (
                  <Link
                    key={post.slug}
                    to={`/${post.slug}`}
                    className="block p-4 bg-card rounded-lg border border-border hover:shadow-card transition-all"
                  >
                    <h3 className="font-serif font-semibold text-foreground hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.metaDescription}</p>
                    <span className="text-xs text-primary mt-2 inline-block">
                      Updated {new Date(post.dateModified).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="text-center p-8 bg-gradient-spiritual rounded-2xl shadow-spiritual">
              <h2 className="font-serif text-xl font-bold text-primary-foreground mb-2">
                Discover Your Angel Number Meaning
              </h2>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Use the free calculator tool to uncover your personal angel number message.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground text-primary rounded-full font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                Try the Calculator →
              </Link>
            </div>
          </div>
        </div>
      </div>
      <NewsletterSection />
    </>
  );
};

export default AuthorPage;
