import { Link } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const blogLinks = [
    { label: "Angel Number 111", path: "/angel-number-111" },
    { label: "Angel Number 222", path: "/angel-number-222" },
    { label: "Angel Number 444", path: "/angel-number-444" },
    { label: "Angel Number 555", path: "/angel-number-555" },
    { label: "Angel Number 777", path: "/angel-number-777" },
    { label: "Angel Number 888", path: "/angel-number-888" },
    { label: "Angel Number 999", path: "/angel-number-999" },
  ];

  const moreLinks = [
    { label: "333 After Breakup", path: "/333-meaning-after-breakup" },
    { label: "333 in Career", path: "/333-meaning-in-career" },
    { label: "Manifestation Guide", path: "/angel-numbers-manifestation-guide" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms & Conditions", path: "/terms-and-conditions" },
    { label: "Disclaimer", path: "/disclaimer" },
    { label: "Cookie Policy", path: "/cookie-policy" },
    { label: "Affiliate Disclosure", path: "/affiliate-disclosure" },
  ];

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-serif text-lg font-bold text-foreground">
                Angel Number 333
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted guide to understanding angel numbers, spiritual meanings, 
              and divine messages from the universe.
            </p>
          </div>

          {/* Angel Numbers */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Angel Numbers</h4>
            <ul className="space-y-2">
              {blogLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Guides */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">More Guides</h4>
            <ul className="space-y-2">
              {moreLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} theangelnumber333.com. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-primary" /> for spiritual seekers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
