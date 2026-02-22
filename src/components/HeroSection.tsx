import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Spiritual celestial background with angel number 333"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="h-4 w-4 text-spiritual-gold" />
            <span className="text-sm font-medium tracking-widest uppercase text-primary-foreground/80">
              Divine Numerology Guide
            </span>
            <Star className="h-4 w-4 text-spiritual-gold" />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 max-w-4xl mx-auto">
            Angel Number 333 Meaning:{" "}
            <span className="text-gradient-gold">
              Spiritual, Love, Twin Flame & Biblical Symbolism
            </span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Unlock the divine secrets behind seeing 333. Your comprehensive guide to 
            understanding this powerful angel number's spiritual, romantic, and biblical significance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#content"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-spiritual text-primary-foreground rounded-full font-medium shadow-spiritual hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5"
            >
              <Sparkles className="h-4 w-4" />
              Discover the Meaning
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground rounded-full font-medium hover:bg-primary-foreground/20 transition-all duration-300"
            >
              Try the Calculator
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#content" aria-label="Scroll down">
            <ChevronDown className="h-6 w-6 text-primary-foreground/60 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
