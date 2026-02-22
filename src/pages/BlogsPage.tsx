import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogPosts";

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(a.dateModified).getTime() - new Date(b.dateModified).getTime()
);

const BlogsPage = () => {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Angel Number Blog – Spiritual Guides & Meanings",
    "description": "Browse all angel number guides including 111, 222, 333, 444, 555, 777, 888, 999 and more spiritual numerology articles.",
    "url": "https://theangelnumber333.com/blogs",
    "isPartOf": { "@type": "WebSite", "name": "Angel Number 333 Meaning", "url": "https://theangelnumber333.com" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://theangelnumber333.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://theangelnumber333.com/blogs" },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Angel Number Blog – All Spiritual Guides & Meanings (2026)</title>
        <meta name="description" content="Browse all angel number guides including 111, 222, 333, 444, 555, 777, 888, 999 and more spiritual numerology articles." />
        <link rel="canonical" href="https://theangelnumber333.com/blogs" />
        <meta property="og:title" content="Angel Number Blog – Spiritual Guides & Meanings" />
        <meta property="og:description" content="Browse all angel number guides and spiritual numerology articles." />
        <meta property="og:url" content="https://theangelnumber333.com/blogs" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Angel Number 333 Meaning" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Angel Number Blog – Spiritual Guides & Meanings" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <section className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Blog</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              Angel Number Blog
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive guides on angel numbers, spiritual meanings, love, career and manifestation. {sortedPosts.length} in-depth articles to guide your journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/${post.slug}`}
                  className="block bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 h-full group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-spiritual flex items-center justify-center mb-4">
                    <span className="text-primary-foreground font-serif font-bold text-lg">{post.number}</span>
                  </div>
                  <time dateTime={post.dateModified} className="text-xs text-muted-foreground">
                    {new Date(post.dateModified).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </time>
                  <h2 className="font-serif text-lg font-semibold text-foreground mb-2 mt-1 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogsPage;
