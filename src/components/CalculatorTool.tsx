import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Heart, Briefcase, Sparkles, Share2, Download } from "lucide-react";
import jsPDF from "jspdf";

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
  const sum = name
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .reduce((acc, char) => acc + (char.charCodeAt(0) - 96), 0);
  let reduced = sum;
  while (reduced > 9 && reduced !== 11 && reduced !== 22 && reduced !== 33) {
    reduced = String(reduced).split("").reduce((a, b) => a + Number(b), 0);
  }
  return reduced;
};

const getLifePath = (dob: string): number => {
  const digits = dob.replace(/\D/g, "");
  let sum = digits.split("").reduce((a, b) => a + Number(b), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split("").reduce((a, b) => a + Number(b), 0);
  }
  return sum;
};

const spiritualMessages: Record<number, string> = {
  1: "With 333 amplifying your natural leadership energy, you are being called to pioneer new spiritual paths. Your independence and originality are divinely guided — the universe sees your courage and is opening doors that only you can walk through.",
  2: "Angel number 333 enhances your natural gift of diplomacy and partnership. You are a bridge between worlds, bringing harmony wherever you go. Your sensitivity is your superpower — trust the gentle nudges of your intuition.",
  3: "You share a profound resonance with 333's creative energy! Self-expression is your spiritual mission. The ascended masters are amplifying your voice, creativity, and joy. Share your gifts generously — the world needs your light.",
  4: "333 brings divine inspiration to your practical nature. You are building something sacred — a foundation that will uplift many. Your discipline combined with spiritual guidance creates unstoppable momentum toward your goals.",
  5: "The transformative energy of 333 is accelerating your journey of change and adventure. You are a catalyst for evolution — embrace the beautiful chaos of growth. Freedom and spiritual expansion are intertwined in your path.",
  6: "333 deepens your natural capacity for love and nurturing. Your home and family are sacred spaces of spiritual growth. The universe is blessing your relationships with divine harmony and unconditional love.",
  7: "Your mystical nature resonates deeply with 333's spiritual vibrations. You are a seeker of truth, and the ascended masters are revealing profound wisdom through your dreams, meditations, and moments of solitude.",
  8: "333 infuses your material ambitions with divine purpose. Abundance flows to you naturally when you align profit with purpose. You are being guided to use your influence for the highest good of all.",
  9: "With 333's energy, your humanitarian spirit is being elevated to new heights. You are a lightworker destined to heal and inspire. Your compassion combined with divine guidance will touch countless lives.",
  11: "As a master number 11, 333 amplifies your already powerful intuition to extraordinary levels. You are a spiritual messenger — your insights and inspirations are downloads from the divine realm.",
  22: "Master builder 22 combined with 333 creates an extraordinary capacity to manifest spiritual visions into physical reality. You are being called to create lasting structures that serve humanity's evolution.",
  33: "You carry the master teacher number 33, perfectly aligned with angel number 333! This is an extraordinary spiritual signature. You are a beacon of compassion and wisdom, here to uplift humanity through selfless love.",
};

const loveMessages: Record<number, string> = {
  1: "Your love life is entering a bold new chapter. 333 encourages you to lead with your heart and express your feelings without hesitation. A passionate, independent partnership awaits you.",
  2: "Divine partnership energy surrounds you. 333 is drawing your soulmate closer or deepening your existing bond. Trust the beautiful balance of giving and receiving in love.",
  3: "Joy and playfulness are the keys to your love life now. 333 encourages flirtatious energy, creative dates, and expressing love through laughter and shared adventures.",
  4: "333 is building a stable, lasting foundation for your love life. Whether single or partnered, committed and loyal love is your divine path. Trust the slow, steady growth.",
  5: "Exciting romantic changes are coming! 333 brings adventure and transformation to your love life. Be open to unexpected connections and thrilling new experiences with your partner.",
  6: "Your love life is being blessed with deep harmony and domestic bliss. 333 enhances your nurturing nature, creating a sanctuary of love in your relationships and home.",
  7: "A spiritually profound love connection is forming. 333 guides you toward a partner who understands your depth and shares your quest for meaning. Soul-level intimacy awaits.",
  8: "333 brings abundance to your love life — rich emotional connections, passionate commitment, and relationships that empower both partners to reach their highest potential.",
  9: "Universal love flows through you. 333 expands your capacity for compassion and deep romantic connection. Your love story has the power to inspire and heal others.",
  11: "Twin flame energy is strong for you. 333 may be signaling the approach or deepening of this profound spiritual connection. Trust the divine timing of your love journey.",
  22: "Your love life is meant to be extraordinary. 333 guides you toward a partnership that serves as a model for others — built on vision, purpose, and unwavering commitment.",
  33: "You love with the depth of a spiritual master. 333 confirms that your capacity for unconditional love is your greatest gift. Share it freely and receive it graciously.",
};

const careerMessages: Record<number, string> = {
  1: "Leadership opportunities are aligning for you. 333 supports launching your own venture, taking charge of projects, and pioneering innovative approaches in your field.",
  2: "Collaborative success awaits. 333 enhances your ability to build partnerships, mediate conflicts, and create harmonious work environments that bring out the best in everyone.",
  3: "Creative career breakthroughs are imminent. 333 amplifies your communication skills and artistic talents. Consider roles in writing, speaking, teaching, or creative arts.",
  4: "Your dedication is about to be rewarded. 333 supports promotions, business growth, and recognition for your consistent, quality work. Keep building — success is near.",
  5: "A thrilling career change or new opportunity approaches. 333 encourages you to embrace professional transformation and explore careers that offer freedom and variety.",
  6: "Careers in healing, teaching, counseling, or service are strongly supported by 333. Your nurturing nature is a professional asset that will lead to fulfilling work.",
  7: "Research, analysis, teaching, or spiritual careers are highlighted. 333 supports deepening your expertise and sharing specialized knowledge with others.",
  8: "Financial success and business growth are strongly indicated. 333 aligns your ambitions with divine purpose, creating opportunities for significant professional achievement.",
  9: "Your career should serve humanity. 333 guides you toward nonprofit work, global initiatives, artistic expression, or any profession that creates positive change.",
  11: "Your career is meant to inspire and illuminate. 333 supports roles as thought leaders, spiritual teachers, counselors, or creative visionaries.",
  22: "Large-scale projects and organizational leadership are your calling. 333 provides the divine support needed to turn ambitious professional visions into reality.",
  33: "Teaching, healing, and mentoring are at the core of your professional purpose. 333 amplifies your ability to uplift others through your work.",
};

const CalculatorTool = () => {
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
      nameNum,
      lifePath,
      spiritual: spiritualMessages[lifePath] || spiritualMessages[9],
      love: loveMessages[lifePath] || loveMessages[9],
      career: careerMessages[lifePath] || careerMessages[9],
      affirmation,
      manifestation: `With your Life Path ${lifePath} and Name Number ${nameNum}, 333 is urging you to manifest through ${
        lifePath <= 3 ? "creative visualization and bold intention-setting" :
        lifePath <= 6 ? "structured planning combined with heart-centered action" :
        "deep meditation and trusting your powerful intuition"
      }. The universe has aligned this specific moment for you to receive the full power of 333's creative, expansive energy. Focus your intentions now — the ascended masters are listening.`,
    };
  }, [name, dob]);

  const handleCalculate = () => {
    if (name && dob) setShowResult(true);
  };

  const handleShare = async () => {
    if (!result) return;
    try {
      await navigator.share({
        title: "My Angel Number 333 Reading",
        text: `My personalized 333 reading: Life Path ${result.lifePath}. ${result.affirmation}`,
        url: "https://www.theangelnumber333.com",
      });
    } catch {
      navigator.clipboard.writeText(
        `My Angel Number 333 Reading\nLife Path: ${result.lifePath}\n${result.affirmation}\nhttps://www.theangelnumber333.com`
      );
      alert("Reading copied to clipboard!");
    }
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Angel Number 333 Personal Reading", 20, 25);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Life Path Number: ${result.lifePath}`, 20, 48);
    doc.text(`Name Number: ${result.nameNum}`, 20, 56);
    doc.setFont("helvetica", "bold");
    doc.text("Spiritual Meaning:", 20, 70);
    doc.setFont("helvetica", "normal");
    const spiritual = doc.splitTextToSize(result.spiritual, 170);
    doc.text(spiritual, 20, 78);
    let y = 78 + spiritual.length * 6 + 10;
    doc.setFont("helvetica", "bold");
    doc.text("Love Message:", 20, y);
    doc.setFont("helvetica", "normal");
    const love = doc.splitTextToSize(result.love, 170);
    doc.text(love, 20, y + 8);
    y += 8 + love.length * 6 + 10;
    doc.setFont("helvetica", "bold");
    doc.text("Career Message:", 20, y);
    doc.setFont("helvetica", "normal");
    const career = doc.splitTextToSize(result.career, 170);
    doc.text(career, 20, y + 8);
    y += 8 + career.length * 6 + 10;
    doc.setFont("helvetica", "bold");
    doc.text("Manifestation Guidance:", 20, y);
    doc.setFont("helvetica", "normal");
    const manif = doc.splitTextToSize(result.manifestation, 170);
    doc.text(manif, 20, y + 8);
    y += 8 + manif.length * 6 + 10;
    doc.setFont("helvetica", "italic");
    doc.text(`"${result.affirmation}"`, 20, y);
    doc.setFontSize(9);
    doc.text("theangelnumber333.com", 20, 285);
    doc.save("angel-number-333-reading.pdf");
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mb-3">
            <Calculator className="h-4 w-4" /> Interactive Tool
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Angel Number 333 Personal Meaning Calculator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover your personalized spiritual meaning based on numerology. Enter your details 
            below for a unique reading powered by your name and birth date.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 border border-border">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setShowResult(false); }}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => { setDob(e.target.value); setShowResult(false); }}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Life Question <span className="text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What guidance are you seeking?"
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!name || !dob}
              className="w-full py-3 bg-gradient-spiritual text-primary-foreground rounded-lg font-medium shadow-spiritual hover:shadow-elevated transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reveal My 333 Meaning
            </button>

            {showResult && result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-6"
              >
                <div className="text-center p-4 rounded-xl bg-secondary border border-border">
                  <p className="text-sm text-muted-foreground">Your Numbers</p>
                  <div className="flex justify-center gap-8 mt-2">
                    <div>
                      <p className="text-2xl font-serif font-bold text-primary">{result.lifePath}</p>
                      <p className="text-xs text-muted-foreground">Life Path</p>
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-bold text-primary">{result.nameNum}</p>
                      <p className="text-xs text-muted-foreground">Name Number</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <ResultCard icon={<Sparkles className="h-5 w-5 text-primary" />} title="Spiritual Meaning" text={result.spiritual} />
                  <ResultCard icon={<Heart className="h-5 w-5 text-primary" />} title="Love Message" text={result.love} />
                  <ResultCard icon={<Briefcase className="h-5 w-5 text-primary" />} title="Career Message" text={result.career} />
                  <ResultCard icon={<Sparkles className="h-5 w-5 text-spiritual-gold" />} title="Manifestation Guidance" text={result.manifestation} />
                </div>

                <div className="p-4 rounded-xl bg-gradient-spiritual text-primary-foreground text-center">
                  <p className="text-sm opacity-80 mb-1">Your Affirmation</p>
                  <p className="font-serif text-lg italic">"{result.affirmation}"</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleShare}
                    className="flex-1 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Share2 className="h-4 w-4" /> Share
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex-1 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Download className="h-4 w-4" /> Download PDF
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ResultCard = ({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) => (
  <div className="p-4 rounded-xl bg-secondary/50 border border-border">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h4 className="font-serif font-semibold text-foreground">{title}</h4>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

export default CalculatorTool;
