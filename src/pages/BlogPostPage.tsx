import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { getPostBySlug } from "@/data/blogPosts";
import AuthorBox from "@/components/AuthorBox";
import AdPlaceholder from "@/components/AdPlaceholder";
import NewsletterSection from "@/components/NewsletterSection";
import SiloLinks from "@/components/SiloLinks";
import type { BlogSection, TableData } from "@/data/blogPosts";

const RenderTable = ({ table }: { table: TableData }) => (
  <div className="my-6 overflow-x-auto">
    {table.caption && <p className="text-sm font-medium text-foreground mb-2">{table.caption}</p>}
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-primary/10">
          {table.headers.map((h, i) => (
            <th key={i} className="border border-border px-3 py-2 text-left font-serif font-semibold text-foreground">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-secondary/30"}>
            {row.map((cell, j) => (
              <td key={j} className="border border-border px-3 py-2 text-muted-foreground">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RenderSection = ({ section, index }: { section: BlogSection; index: number }) => (
  <section id={`section-${index}`} className="mb-10">
    {section.level === "h2" ? (
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 heading-decorated">{section.heading}</h2>
    ) : (
      <h3 className="font-serif text-xl font-semibold text-foreground mb-3 heading-decorated">{section.heading}</h3>
    )}
    <div className="content-box prose-spiritual">
      {section.paragraphs.map((p, j) => (
        <p key={j} className="text-muted-foreground">{p}</p>
      ))}
    </div>
    {section.bulletPoints && (
      <ul className="list-disc pl-6 space-y-2 mb-6 ml-4">
        {section.bulletPoints.map((bp, j) => (
          <li key={j} className="text-muted-foreground leading-relaxed text-sm">{bp}</li>
        ))}
      </ul>
    )}
    {section.table && <RenderTable table={section.table} />}
  </section>
);

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.theangelnumber333.com/" },
      { "@type": "ListItem", "position": 2, "name": "Daniel Carter", "item": "https://www.theangelnumber333.com/author" },
      { "@type": "ListItem", "position": 3, "name": post.title.split(":")[0], "item": `https://www.theangelnumber333.com/${post.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "author": { "@type": "Person", "name": "Daniel Carter", "jobTitle": "Spiritual Numerology Expert", "url": "https://www.theangelnumber333.com/author" },
    "publisher": { "@type": "Organization", "name": "Angel Number 333 Meaning", "url": "https://www.theangelnumber333.com" },
    "datePublished": post.datePublished,
    "dateModified": post.dateModified,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.theangelnumber333.com/${post.slug}` },
    "url": `https://www.theangelnumber333.com/${post.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": post.metaTitle,
    "description": post.metaDescription,
    "url": `https://www.theangelnumber333.com/${post.slug}`,
    "isPartOf": { "@type": "WebSite", "name": "Angel Number 333 Meaning", "url": "https://www.theangelnumber333.com" },
  };

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`https://www.theangelnumber333.com/${post.slug}`} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={`https://www.theangelnumber333.com/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Angel Number 333 Meaning" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>

      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 max-w-3xl mx-auto flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/author" className="hover:text-primary transition-colors">Daniel Carter</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{post.title.split(":")[0]}</span>
          </nav>

          <div className="max-w-3xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Angel Number 333
            </Link>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight heading-decorated">{post.title}</h1>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
              <Link to="/author" className="hover:text-primary transition-colors">By Daniel Carter</Link>
              <span>•</span>
              <time dateTime={post.dateModified}>Updated {new Date(post.dateModified).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
            </div>

            {/* Quick Reference Table */}
            {post.tableData && <RenderTable table={post.tableData} />}

            {/* TOC */}
            <nav className="bg-secondary/50 rounded-xl p-5 mb-10 border border-border">
              <p className="font-serif font-semibold text-foreground mb-3">📖 In This Article</p>
              <ul className="space-y-1.5">
                {post.content.map((s, i) => (
                  <li key={i} className={s.level === "h3" ? "pl-4" : ""}>
                    <a href={`#section-${i}`} className="text-sm text-primary hover:underline">
                      {s.level === "h3" ? "↳ " : ""}{s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#blog-faqs" className="text-sm text-primary hover:underline">Frequently Asked Questions</a>
                </li>
              </ul>
            </nav>

            <AdPlaceholder slot="blog-top" />

            {/* Content */}
            {post.content.map((section, i) => (
              <div key={i}>
                <RenderSection section={section} index={i} />
                {i === 2 && <AdPlaceholder slot="blog-mid-1" />}
                {i === 5 && <AdPlaceholder slot="blog-mid-2" />}
                {i === Math.floor(post.content.length * 0.8) && i > 5 && <AdPlaceholder slot="blog-mid-3" />}
              </div>
            ))}

            {/* FAQs */}
            <section id="blog-faqs" className="mb-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 heading-decorated">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {post.faqs.map((faq, i) => (
                  <details key={i} className="faq-item group rounded-lg border border-border p-4">
                    <summary className="font-serif font-semibold text-foreground cursor-pointer list-none flex justify-between items-center">
                      {faq.question}
                      <span className="text-primary ml-2 group-open:rotate-45 transition-transform text-xl">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Silo-based internal linking */}
            <SiloLinks currentSlug={slug || ""} />

            {/* Internal linking CTA */}
            <div className="text-center p-8 bg-gradient-spiritual rounded-2xl shadow-spiritual mb-10">
              <h2 className="font-serif text-xl font-bold text-primary-foreground mb-2">
                Discover the Full Meaning of Angel Number 333
              </h2>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Read our comprehensive guide and try the free personal meaning calculator.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground text-primary rounded-full font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                Explore 333 Meaning →
              </Link>
            </div>

            <AuthorBox />
          </div>
        </div>
      </article>
      <NewsletterSection />
    </>
  );
};

export default BlogPostPage;
