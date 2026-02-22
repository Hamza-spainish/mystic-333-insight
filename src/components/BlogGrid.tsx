import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blogPosts";

const BlogGrid = () => (
  <section id="blog" className="py-16 md:py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 heading-decorated heading-decorated-center">
          Explore More Angel Numbers
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Dive deeper into the world of angel numbers with our comprehensive guides on each powerful number sequence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/${post.slug}`}
              className="block bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 h-full group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-spiritual flex items-center justify-center mb-4">
                <span className="text-primary-foreground font-serif font-bold text-lg">{post.number}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
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
);

export default BlogGrid;
