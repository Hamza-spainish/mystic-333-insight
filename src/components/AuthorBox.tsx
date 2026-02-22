import { User } from "lucide-react";
import { Link } from "react-router-dom";

const AuthorBox = () => (
  <section id="author" className="py-12 md:py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-card border border-border p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Link to="/author" className="w-20 h-20 rounded-full bg-gradient-spiritual flex items-center justify-center flex-shrink-0">
            <User className="h-10 w-10 text-primary-foreground" />
          </Link>
          <div>
            <Link to="/author" className="font-serif text-xl font-bold text-foreground hover:text-primary transition-colors">Daniel Carter</Link>
            <p className="text-sm text-primary font-medium mb-3">Spiritual Numerology Expert · 8+ Years Experience</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Daniel Carter is a renowned spiritual numerology expert with over eight years of dedicated practice 
              in angel number interpretation, sacred geometry, and spiritual counseling. His journey began after 
              a profound spiritual awakening that led him to study ancient numerological traditions across cultures. 
              Daniel has guided thousands of individuals worldwide in understanding the divine messages encoded in 
              numbers, helping them unlock their spiritual potential and align with their life purpose.
            </p>
            <Link to="/author" className="text-sm text-primary hover:underline mt-2 inline-block">Read full bio →</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AuthorBox;
