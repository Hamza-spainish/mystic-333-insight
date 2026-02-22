import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Star, Calculator, Heart, Briefcase, Share2, Download } from "lucide-react";
import jsPDF from "jspdf";
import heroBg from "@/assets/hero-bg.jpg";

/* ───── Calculator logic ───── */
const affirmations = [
  "The universe is conspiring in your favor. Trust the divine plan.",
  "You are a powerful creator. Your thoughts shape your reality.",
  "Love flows to you and through you in abundance.",
  "Your angels are guiding every step of your journey.",
  "You are exactly where you need to be on your spiritual path.",
  "Abundance in all forms is your divine birthright.",
  "Your light is needed in this world. Shine boldly.",
  "Trust your intuition — it is your angels speaking to you.",
  "Every ending is a beautiful new beginning in disguise.",
  "You are loved beyond measure by the entire universe.",
  "Your dreams are valid and divinely supported.",
  "The best is yet to come. Keep faith in your heart.",
];

const getNameNumber = (name: string): number => {
  const sum = name.toLowerCase().replace(/[^a-z]/g, "").split("").reduce((acc, c) => acc + (c.charCodeAt(0) - 96), 0);
  let r = sum;
  while (r > 9 && r !== 11 && r !== 22 && r !== 33) r = String(r).split("").reduce((a, b) => a + Number(b), 0);
  return r;
};

const getLifePath = (dob: string): number => {
  let sum = dob.replace(/\D/g, "").split("").reduce((a, b) => a + Number(b), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) sum = String(sum).split("").reduce((a, b) => a + Number(b), 0);
  return sum;
};

const spiritualMessages: Record<number, string> = {
  1: "With 333 amplifying your natural leadership energy, you are being called to pioneer new spiritual paths.",
  2: "Angel number 333 enhances your natural gift of diplomacy and partnership.",
  3: "You share a profound resonance with 333's creative energy! Self-expression is your spiritual mission.",
  4: "333 brings divine inspiration to your practical nature. You are building something sacred.",
  5: "The transformative energy of 333 is accelerating your journey of change and adventure.",
  6: "333 deepens your natural capacity for love and nurturing.",
  7: "Your mystical nature resonates deeply with 333's spiritual vibrations.",
  8: "333 infuses your material ambitions with divine purpose.",
  9: "With 333's energy, your humanitarian spirit is being elevated to new heights.",
  11: "As a master number 11, 333 amplifies your already powerful intuition to extraordinary levels.",
  22: "Master builder 22 combined with 333 creates an extraordinary capacity to manifest spiritual visions.",
  33: "You carry the master teacher number 33, perfectly aligned with angel number 333!",
};
const loveMessages: Record<number, string> = {
  1: "Your love life is entering a bold new chapter. 333 encourages you to lead with your heart.",
  2: "Divine partnership energy surrounds you. 333 is drawing your soulmate closer.",
  3: "Joy and playfulness are the keys to your love life now.",
  4: "333 is building a stable, lasting foundation for your love life.",
  5: "Exciting romantic changes are coming! 333 brings adventure to your love life.",
  6: "Your love life is being blessed with deep harmony and domestic bliss.",
  7: "A spiritually profound love connection is forming.",
  8: "333 brings abundance to your love life — rich emotional connections.",
  9: "Universal love flows through you. 333 expands your capacity for deep connection.",
  11: "Twin flame energy is strong for you.",
  22: "Your love life is meant to be extraordinary.",
  33: "You love with the depth of a spiritual master.",
};
const careerMessages: Record<number, string> = {
  1: "Leadership opportunities are aligning for you.",
  2: "Collaborative success awaits.",
  3: "Creative career breakthroughs are imminent.",
  4: "Your dedication is about to be rewarded.",
  5: "A thrilling career change or new opportunity approaches.",
  6: "Careers in healing, teaching, or service are strongly supported.",
  7: "Research, analysis, or spiritual careers are highlighted.",
  8: "Financial success and business growth are strongly indicated.",
  9: "Your career should serve humanity.",
  11: "Your career is meant to inspire and illuminate.",
  22: "Large-scale projects and organizational leadership are your calling.",
  33: "Teaching, healing, and mentoring are at the core of your purpose.",
};

const ResultCard = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="p-4 rounded-lg bg-background/60 border border-border">
    <div className="flex items-center gap-2 mb-2">{icon}<span className="font-serif font-semibold text-foreground text-sm">{title}</span></div>
    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

const HeroSection = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [question, setQuestion] = useState("");
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    if (!name || !dob) return null;
    const nameNum = getNameNumber(name);
    const lifePath = getLifePath(dob);
    const combined = ((nameNum + lifePath) % 9) || 9;
    const affirmation = affirmations[combined % affirmations.length];
    return {
      nameNum, lifePath,
      spiritual: spiritualMessages[lifePath] || spiritualMessages[9],
      love: loveMessages[lifePath] || loveMessages[9],
      career: careerMessages[lifePath] || careerMessages[9],
      affirmation,
      manifestation: `With your Life Path ${lifePath} and Name Number ${nameNum}, 333 is urging you to manifest through ${lifePath <= 3 ? "creative visualization and bold intention-setting" : lifePath <= 6 ? "structured planning combined with heart-centered action" : "deep meditation and trusting your powerful intuition"}. The ascended masters are listening.`,
    };
  }, [name, dob]);

  const handleCalculate = () => { if (name && dob) setShowResult(true); };

  const handleShare = async () => {
    if (!result) return;
    try {
      await navigator.share({ title: "My Angel Number 333 Reading", text: `Life Path ${result.lifePath}. ${result.affirmation}`, url: "https://theangelnumber333.com" });
    } catch { navigator.clipboard.writeText(`Angel Number 333 Reading\nLife Path: ${result.lifePath}\n${result.affirmation}\nhttps://theangelnumber333.com`); alert("Copied to clipboard!"); }
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold"); doc.setFontSize(20);
    doc.text("Angel Number 333 Personal Reading", 20, 25);
    doc.setFont("helvetica", "normal"); doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40); doc.text(`Life Path: ${result.lifePath}`, 20, 48); doc.text(`Name Number: ${result.nameNum}`, 20, 56);
    let y = 70;
    [["Spiritual", result.spiritual], ["Love", result.love], ["Career", result.career], ["Manifestation", result.manifestation]].forEach(([t, v]) => {
      doc.setFont("helvetica", "bold"); doc.text(`${t}:`, 20, y);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(v as string, 170);
      doc.text(lines, 20, y + 8); y += 8 + lines.length * 6 + 10;
    });
    doc.setFont("helvetica", "italic"); doc.text(`"${result.affirmation}"`, 20, y);
    doc.setFontSize(9); doc.text("theangelnumber333.com", 20, 285);
    doc.save("angel-number-333-reading.pdf");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Spiritual celestial background with angel number 333" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="h-4 w-4 text-spiritual-gold" />
            <span className="text-sm font-medium tracking-widest uppercase text-primary-foreground/80">Divine Numerology Guide</span>
            <Star className="h-4 w-4 text-spiritual-gold" />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 max-w-4xl mx-auto">
            Angel Number 333 Meaning:{" "}
            <span className="text-gradient-gold">Spiritual, Love, Twin Flame & Biblical Symbolism</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Unlock the divine secrets behind seeing 333. Your comprehensive guide to understanding this powerful angel number's spiritual, romantic, and biblical significance.
          </p>
        </motion.div>

        {/* ───── Calculator in Hero ───── */}
        <motion.div
          id="calculator"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-elevated p-6 md:p-8 border border-border text-left">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-2">
                <Calculator className="h-4 w-4" />
                Free Angel Number Calculator Tool
              </div>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground">
                Calculate Your Personal 333 Meaning
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Use our free numerology calculator to discover what angel number 333 means specifically for you. Get personalized spiritual, love & career insights instantly.
              </p>
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <input type="text" value={name} onChange={(e) => { setName(e.target.value); setShowResult(false); }} placeholder="Enter your full name" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Date of Birth</label>
                <input type="date" value={dob} onChange={(e) => { setDob(e.target.value); setShowResult(false); }} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Life Question <span className="text-muted-foreground">(optional)</span></label>
                <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What guidance are you seeking?" rows={2} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none text-sm" />
              </div>
            </div>

            <button onClick={handleCalculate} disabled={!name || !dob} className="w-full py-3 bg-gradient-spiritual text-primary-foreground rounded-lg font-medium shadow-spiritual hover:shadow-elevated transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              🔮 Calculate My Angel Number Reading
            </button>

            {showResult && result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
                <div className="text-center p-3 rounded-xl bg-secondary border border-border">
                  <p className="text-xs text-muted-foreground">Your Numerology Numbers</p>
                  <div className="flex justify-center gap-8 mt-1">
                    <div><p className="text-2xl font-serif font-bold text-primary">{result.lifePath}</p><p className="text-xs text-muted-foreground">Life Path</p></div>
                    <div><p className="text-2xl font-serif font-bold text-primary">{result.nameNum}</p><p className="text-xs text-muted-foreground">Name Number</p></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <ResultCard icon={<Sparkles className="h-4 w-4 text-primary" />} title="Spiritual Meaning" text={result.spiritual} />
                  <ResultCard icon={<Heart className="h-4 w-4 text-primary" />} title="Love Message" text={result.love} />
                  <ResultCard icon={<Briefcase className="h-4 w-4 text-primary" />} title="Career Message" text={result.career} />
                  <ResultCard icon={<Sparkles className="h-4 w-4 text-spiritual-gold" />} title="Manifestation Guidance" text={result.manifestation} />
                </div>
                <div className="p-3 rounded-xl bg-gradient-spiritual text-primary-foreground text-center">
                  <p className="text-xs opacity-80 mb-1">Your Affirmation</p>
                  <p className="font-serif text-sm italic">"{result.affirmation}"</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleShare} className="flex-1 py-2 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-xs"><Share2 className="h-3.5 w-3.5" /> Share</button>
                  <button onClick={handleDownloadPDF} className="flex-1 py-2 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-xs"><Download className="h-3.5 w-3.5" /> Download PDF</button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-8">
          <a href="#content" aria-label="Scroll down" className="inline-flex flex-col items-center gap-1 text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors">
            <span className="text-xs">Explore the Full Guide</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
