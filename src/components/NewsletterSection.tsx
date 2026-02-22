import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-gradient-spiritual rounded-2xl p-8 md:p-12 shadow-elevated">
            <Sparkles className="h-8 w-8 text-primary-foreground mx-auto mb-4" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
              Receive Divine Guidance Weekly
            </h2>
            <p className="text-primary-foreground/80 mb-6 text-sm">
              Join thousands of spiritual seekers. Get angel number interpretations, 
              manifestation tips, and spiritual insights delivered to your inbox.
            </p>

            {submitted ? (
              <div className="bg-primary-foreground/10 rounded-lg p-4">
                <p className="text-primary-foreground font-medium">✨ Thank you! You're now connected to divine guidance.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-foreground text-primary rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors whitespace-nowrap"
                >
                  Subscribe Free
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
