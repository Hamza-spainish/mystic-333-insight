import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles, BookOpen, Heart, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Angel Number 333</title>
        <meta name="description" content="Learn about theangelnumber333.com — our mission, values, and the team behind your trusted source for angel number meanings and spiritual guidance." />
        <link rel="canonical" href="https://www.theangelnumber333.com/about-us" />
      </Helmet>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 max-w-3xl mx-auto">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">About Us</span>
          </nav>

          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-8">About Us</h1>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Welcome to <strong className="text-foreground">theangelnumber333.com</strong> — your trusted destination for understanding angel numbers, spiritual symbolism, and the divine messages woven into everyday life.
              </p>

              <div className="grid gap-6 sm:grid-cols-3 my-10">
                {[
                  { icon: Sparkles, title: "Our Mission", text: "To make spiritual wisdom accessible, practical, and meaningful for everyone on their journey." },
                  { icon: BookOpen, title: "Our Content", text: "In-depth, well-researched articles grounded in numerology, spirituality, and real-life application." },
                  { icon: Heart, title: "Our Values", text: "Authenticity, compassion, and a genuine desire to help others find clarity and purpose." },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="bg-card border border-border rounded-xl p-6 text-center">
                    <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-serif font-semibold text-foreground mb-2">{title}</h3>
                    <p className="text-sm">{text}</p>
                  </div>
                ))}
              </div>

              <h2 className="font-serif text-xl font-bold text-foreground mt-8 mb-3">Who We Are</h2>
              <p>
                We are a small team of spiritual enthusiasts, writers, and researchers passionate about numerology and angel numbers. Our founder, <Link to="/author" className="text-primary hover:underline">Daniel Carter</Link>, has spent over a decade studying the connections between numbers, spirituality, and personal growth.
              </p>

              <h2 className="font-serif text-xl font-bold text-foreground mt-8 mb-3">What We Do</h2>
              <p>
                Every article on our site is carefully crafted to provide accurate, thoughtful, and actionable insights. Whether you're seeing 333 on the clock, 111 on a license plate, or 777 in a phone number — we help you understand what the universe may be communicating.
              </p>

              <h2 className="font-serif text-xl font-bold text-foreground mt-8 mb-3">Why Trust Us</h2>
              <p>
                We don't just publish generic content. Our guides are rooted in established numerological traditions, cross-referenced with spiritual teachings, and written with genuine care for our readers' well-being. We are transparent about our <Link to="/affiliate-disclosure" className="text-primary hover:underline">affiliate relationships</Link> and committed to maintaining editorial integrity.
              </p>

              <div className="bg-secondary/50 border border-border rounded-xl p-6 mt-10 flex items-start gap-4">
                <Users className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif font-semibold text-foreground mb-1">Join Our Community</h3>
                  <p className="text-sm">
                    Have questions or want to connect? Visit our <Link to="/contact-us" className="text-primary hover:underline">Contact Us</Link> page or subscribe to our newsletter for weekly spiritual insights delivered to your inbox.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
