import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import BlogsPage from "./pages/BlogsPage";
import BlogPostPage from "./pages/BlogPostPage";
import { PrivacyPolicy, TermsAndConditions, Disclaimer, CookiePolicy, AffiliateDisclosure } from "./pages/LegalPages";
import AuthorPage from "./pages/AuthorPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AdSensePolicy from "./pages/AdSensePolicy";
import NotFound from "./pages/NotFound";

// Google Search Console verification - renders plain text without layout
const GoogleVerification = () => {
  // Hide header/footer and render only verification text
  document.title = "google-site-verification: google247936339c711ead.html";
  return (
    <div style={{ position: "fixed", inset: 0, background: "white", zIndex: 9999, display: "flex", alignItems: "flex-start", padding: 0, margin: 0 }}>
      <pre style={{ margin: 0, padding: 0, fontFamily: "monospace", fontSize: "14px" }}>
        google-site-verification: google247936339c711ead.html
      </pre>
    </div>
  );
};

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/adsense-policy" element={<AdSensePolicy />} />
          <Route path="/author" element={<AuthorPage />} />
          <Route path="/google247936339c711ead.html" element={<GoogleVerification />} />
          <Route path="/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
