import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "Thank you for reaching out. We'll get back to you soon." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us – Angel Number 333 | Get Spiritual Guidance & Support</title>
        <meta name="description" content="Contact theangelnumber333.com for questions about angel numbers, spiritual numerology, or our content. Reach our team for spiritual guidance and support." />
        <link rel="canonical" href="https://www.theangelnumber333.com/contact-us" />
        <meta property="og:title" content="Contact Us – Angel Number 333 | Spiritual Guidance & Support" />
        <meta property="og:description" content="Contact theangelnumber333.com for questions about angel numbers, spiritual numerology, or our content." />
        <meta property="og:url" content="https://www.theangelnumber333.com/contact-us" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Angel Number 333 Meaning" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Us – Angel Number 333",
          "description": "Contact theangelnumber333.com for questions about angel numbers and spiritual numerology.",
          "url": "https://www.theangelnumber333.com/contact-us",
          "isPartOf": { "@type": "WebSite", "name": "Angel Number 333 Meaning", "url": "https://www.theangelnumber333.com" }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.theangelnumber333.com/" },
            { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://www.theangelnumber333.com/contact-us" }
          ]
        })}</script>
      </Helmet>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 max-w-3xl mx-auto">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Contact Us</span>
          </nav>

          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Have a question, suggestion, or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <div className="grid gap-10 md:grid-cols-[1fr_280px]">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                    <input
                      id="name" type="text" required
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                    <input
                      id="email" type="email" required
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                  <input
                    id="subject" type="text" required
                    value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea
                    id="message" rows={5} required
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    placeholder="Your message…"
                  />
                </div>
                <button type="submit" className="bg-primary text-primary-foreground font-medium rounded-lg px-6 py-2.5 text-sm hover:opacity-90 transition-opacity">
                  Send Message
                </button>
              </form>

              <aside className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-5">
                  <Mail className="h-5 w-5 text-primary mb-2" />
                  <h3 className="font-serif font-semibold text-foreground text-sm mb-1">Email Us</h3>
                  <p className="text-xs text-muted-foreground">contact@theangelnumber333.com</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                  <MessageSquare className="h-5 w-5 text-primary mb-2" />
                  <h3 className="font-serif font-semibold text-foreground text-sm mb-1">Response Time</h3>
                  <p className="text-xs text-muted-foreground">We typically respond within 24–48 hours on business days.</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
