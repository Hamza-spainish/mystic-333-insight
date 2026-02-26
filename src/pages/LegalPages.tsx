import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface LegalPageProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  children: React.ReactNode;
}

const LegalLayout = ({ title, metaTitle, metaDescription, children }: LegalPageProps) => {
  const slug = title.toLowerCase().replace(/[& ]+/g, '-').replace(/--/g, '-');
  return (
  <>
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={`https://www.theangelnumber333.com/${slug}`} />
    </Helmet>
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 max-w-3xl mx-auto">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{title}</span>
        </nav>
        <div className="max-w-3xl mx-auto prose prose-sm">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-8">{title}</h1>
          <div className="text-muted-foreground leading-relaxed space-y-4 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy" metaTitle="Privacy Policy – Angel Number 333 | Data Protection & Your Rights" metaDescription="How theangelnumber333.com collects, uses & protects your data. GDPR compliant privacy policy covering cookies, analytics & your rights as a visitor.">
    <p>Last updated: February 22, 2026</p>
    <p>At theangelnumber333.com, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
    <h2>Information We Collect</h2>
    <p>We may collect information about you in a variety of ways including:</p>
    <ul><li>Personal data you voluntarily provide (name, email address) when subscribing to our newsletter</li><li>Usage data automatically collected (browser type, IP address, pages visited, time spent)</li><li>Cookies and tracking technologies for analytics and advertising</li></ul>
    <h2>How We Use Your Information</h2>
    <p>We use the information we collect to: deliver and improve our content, send newsletters if subscribed, analyze website usage, display relevant advertisements, and comply with legal obligations.</p>
    <h2>Third-Party Services</h2>
    <p>We may use third-party services including Google Analytics and Google AdSense. These services may collect information used to identify you. We encourage you to review their privacy policies.</p>
    <h2>GDPR Compliance</h2>
    <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. You can request access to, correction, or deletion of your personal data by contacting us.</p>
    <h2>Cookie Policy</h2>
    <p>We use cookies to enhance your experience. You can control cookies through your browser settings. For more details, see our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.</p>
    <h2>Contact Us</h2>
    <p>If you have questions about this Privacy Policy, please contact us through our website.</p>
  </LegalLayout>
);

export const TermsAndConditions = () => (
  <LegalLayout title="Terms & Conditions" metaTitle="Terms & Conditions – Angel Number 333 | Website Usage Terms" metaDescription="Terms of use for theangelnumber333.com. Your rights, responsibilities & content usage guidelines for our angel number guides and spiritual resources.">
    <p>Last updated: February 22, 2026</p>
    <p>By accessing and using theangelnumber333.com, you accept and agree to be bound by these Terms and Conditions.</p>
    <h2>Use of Content</h2>
    <p>All content on this website is for informational and entertainment purposes only. The spiritual and numerological information provided should not be considered as professional medical, financial, or psychological advice.</p>
    <h2>Intellectual Property</h2>
    <p>All content, including text, graphics, logos, and images, is the property of theangelnumber333.com and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
    <h2>User Conduct</h2>
    <p>You agree not to use the website for any unlawful purpose, attempt to gain unauthorized access, or interfere with the proper functioning of the website.</p>
    <h2>Disclaimer of Warranties</h2>
    <p>This website is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or usefulness of any information on the site.</p>
    <h2>Limitation of Liability</h2>
    <p>In no event shall theangelnumber333.com be liable for any indirect, incidental, special, or consequential damages arising from your use of the website.</p>
    <h2>Changes to Terms</h2>
    <p>We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of updated terms.</p>
  </LegalLayout>
);

export const Disclaimer = () => (
  <LegalLayout title="Disclaimer" metaTitle="Disclaimer – Angel Number 333 | Spiritual Content Notice" metaDescription="Disclaimer for theangelnumber333.com: angel number & numerology content is for informational purposes only. Not a substitute for professional medical or financial advice.">
    <p>Last updated: February 22, 2026</p>
    <h2>General Disclaimer</h2>
    <p>The information provided on theangelnumber333.com is for general informational and entertainment purposes only. All content related to angel numbers, numerology, spirituality, and related topics represents personal interpretations and should not be taken as absolute truth or professional advice.</p>
    <h2>Not Professional Advice</h2>
    <p>The content on this website is not intended to substitute for professional medical, psychological, financial, or legal advice. Always seek the guidance of qualified professionals for specific concerns.</p>
    <h2>Personal Responsibility</h2>
    <p>Any actions you take based on the information provided on this website are strictly at your own risk. We are not responsible for any losses, damages, or negative outcomes resulting from the use of our content.</p>
    <h2>Affiliate Links</h2>
    <p>This website may contain affiliate links. We may earn a commission if you make a purchase through these links, at no additional cost to you. See our <Link to="/affiliate-disclosure" className="text-primary hover:underline">Affiliate Disclosure</Link> for details.</p>
    <h2>Accuracy of Information</h2>
    <p>While we strive to provide accurate and up-to-date information, we make no representations or warranties about the completeness, accuracy, or reliability of the content.</p>
  </LegalLayout>
);

export const CookiePolicy = () => (
  <LegalLayout title="Cookie Policy" metaTitle="Cookie Policy – Angel Number 333 | How We Use Cookies" metaDescription="How theangelnumber333.com uses cookies for analytics & personalized ads. Manage your cookie preferences and learn about GDPR-compliant consent options.">
    <p>Last updated: February 22, 2026</p>
    <p>This Cookie Policy explains how theangelnumber333.com uses cookies and similar tracking technologies.</p>
    <h2>What Are Cookies?</h2>
    <p>Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently and provide information to website owners.</p>
    <h2>Types of Cookies We Use</h2>
    <ul><li><strong>Essential Cookies:</strong> Required for the website to function properly.</li><li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (Google Analytics).</li><li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements (Google AdSense).</li><li><strong>Preference Cookies:</strong> Remember your settings and preferences.</li></ul>
    <h2>Managing Cookies</h2>
    <p>You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or delete existing cookies. Note that disabling cookies may affect your experience on our website.</p>
    <h2>Third-Party Cookies</h2>
    <p>Some cookies are placed by third-party services that appear on our pages. We do not control these cookies and recommend reviewing the privacy policies of these third parties.</p>
    <h2>GDPR and Cookie Consent</h2>
    <p>For users in the European Economic Area, we comply with GDPR requirements regarding cookie consent. You will be asked to consent to non-essential cookies when you first visit our site.</p>
  </LegalLayout>
);

export const AffiliateDisclosure = () => (
  <LegalLayout title="Affiliate Disclosure" metaTitle="Affiliate Disclosure – Angel Number 333 | FTC Compliance" metaDescription="FTC-compliant affiliate disclosure for theangelnumber333.com. How affiliate links support our free angel number guides, calculators & spiritual content.">
    <p>Last updated: February 22, 2026</p>
    <h2>FTC Disclosure</h2>
    <p>In accordance with the Federal Trade Commission (FTC) guidelines, theangelnumber333.com discloses that some of the links on this website are affiliate links. This means we may receive a commission if you click on these links and make a purchase, at no additional cost to you.</p>
    <h2>Our Commitment</h2>
    <p>We only recommend products and services that we genuinely believe will benefit our readers. Our editorial content is not influenced by affiliate partnerships. We maintain our integrity and provide honest opinions regardless of compensation.</p>
    <h2>How Affiliate Links Work</h2>
    <p>When you click an affiliate link and make a purchase, the retailer pays us a small commission. This helps support the operation of our website and allows us to continue providing free spiritual content and tools.</p>
    <h2>Your Trust</h2>
    <p>Your trust is our top priority. We are transparent about our affiliate relationships and encourage you to make informed purchasing decisions. If you have questions about our affiliate partnerships, please contact us.</p>
  </LegalLayout>
);
