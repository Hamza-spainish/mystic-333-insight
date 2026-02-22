import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { getPostBySlug } from "@/data/blogPosts";
import AuthorBox from "@/components/AuthorBox";
import AdPlaceholder from "@/components/AdPlaceholder";

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

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`https://theangelnumber333.com/${post.slug}`} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": post.faqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer }
            }))
          })}
        </script>
      </Helmet>

      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 max-w-3xl mx-auto">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{post.title.split(":")[0]}</span>
          </nav>

          <div className="max-w-3xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Angel Number 333
            </Link>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">{post.title}</h1>

            {/* TOC */}
            <nav className="bg-secondary/50 rounded-xl p-5 mb-10 border border-border">
              <p className="font-serif font-semibold text-foreground mb-3">📖 In This Article</p>
              <ul className="space-y-1.5">
                {post.content.map((s, i) => (
                  <li key={i}>
                    <a href={`#section-${i}`} className="text-sm text-primary hover:underline">
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li><a href="#blog-faqs" className="text-sm text-primary hover:underline">FAQs</a></li>
              </ul>
            </nav>

            {/* Content */}
            {post.content.map((section, i) => (
              <section key={i} id={`section-${i}`} className="mb-10">
                {section.level === "h2" ? (
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">{section.heading}</h2>
                ) : (
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{section.heading}</h3>
                )}
                {section.content.split("\n\n").map((p, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
                ))}
                {i === 2 && <AdPlaceholder slot="blog-mid" />}
              </section>
            ))}

            {/* FAQs */}
            <section id="blog-faqs" className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {post.faqs.map((faq, i) => (
                  <details key={i} className="group bg-card rounded-lg border border-border p-4">
                    <summary className="font-serif font-semibold text-foreground cursor-pointer list-none flex justify-between items-center">
                      {faq.question}
                      <span className="text-primary ml-2 group-open:rotate-45 transition-transform text-xl">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
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
    </>
  );
};

export default BlogPostPage;
