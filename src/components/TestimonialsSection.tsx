import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah M.",
    location: "California, USA",
    text: "I kept seeing 333 during the hardest time of my life. This guide helped me understand the divine message and completely transformed my perspective. I feel so much more at peace now.",
  },
  {
    name: "James K.",
    location: "London, UK",
    text: "The 333 calculator gave me chills — it was incredibly accurate about my career and love life. I've shared this with all my friends who are on their spiritual journey.",
  },
  {
    name: "Emily R.",
    location: "Toronto, Canada",
    text: "After my breakup, I started seeing 333 everywhere. This website helped me understand it was a sign of healing. Three months later, I'm stronger and happier than ever.",
  },
];

const TestimonialsSection = () => (
  <section className="py-16 md:py-24 bg-secondary/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 heading-decorated heading-decorated-center">
          What Our Readers Say
        </h2>
        <p className="text-muted-foreground">Stories from our spiritual community around the world.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-6 shadow-card"
          >
            <Quote className="h-8 w-8 text-primary/20 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.text}</p>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 fill-spiritual-gold text-spiritual-gold" />
              ))}
            </div>
            <p className="font-medium text-foreground text-sm">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.location}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
