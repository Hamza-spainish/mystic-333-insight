import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, Star } from "lucide-react";

const oracleCards = [
  { id: 1, emoji: "🌟", title: "Divine Purpose", message: "You are being called to step into your true life purpose. The ascended masters confirm you are on the right path.", color: "from-primary to-spiritual-glow" },
  { id: 2, emoji: "💜", title: "Spiritual Growth", message: "A major spiritual awakening is unfolding. Trust the transformation happening within you right now.", color: "from-primary to-spiritual-deep" },
  { id: 3, emoji: "🔥", title: "Creative Fire", message: "Your creative energy is at its peak. Channel it into something meaningful — art, writing, music, or a new venture.", color: "from-accent to-spiritual-gold" },
  { id: 4, emoji: "💕", title: "Love Blessing", message: "Deep, soulful love is either present or approaching. Open your heart to receive divine romantic energy.", color: "from-primary to-accent" },
  { id: 5, emoji: "🦋", title: "Transformation", message: "You are shedding an old version of yourself. Embrace this metamorphosis — what emerges will be beautiful.", color: "from-spiritual-glow to-primary" },
  { id: 6, emoji: "🌈", title: "Abundance Portal", message: "Financial and material abundance is flowing toward you. Release scarcity thinking and welcome prosperity.", color: "from-accent to-primary" },
  { id: 7, emoji: "🕊️", title: "Inner Peace", message: "The ascended masters are wrapping you in peace. Let go of worry — everything is being handled by divine forces.", color: "from-spiritual-light to-primary" },
  { id: 8, emoji: "⚡", title: "Manifestation Power", message: "Your manifestation abilities are supercharged right now. What you focus on will materialize rapidly.", color: "from-accent to-spiritual-glow" },
  { id: 9, emoji: "🌙", title: "Intuition Rising", message: "Trust your gut feelings — they are direct messages from your angels. Your intuition has never been stronger.", color: "from-spiritual-deep to-primary" },
  { id: 10, emoji: "🙏", title: "Divine Protection", message: "You are completely protected by your angels. No harm can reach you when you walk in faith and light.", color: "from-primary to-spiritual-deep" },
  { id: 11, emoji: "✨", title: "Twin Flame Signal", message: "Twin flame energy is active in your life. Whether reunion or healing, a significant soul connection is highlighted.", color: "from-spiritual-glow to-accent" },
  { id: 12, emoji: "🌺", title: "Healing Energy", message: "Powerful healing is flowing into your mind, body, and spirit. Allow yourself to rest and receive this divine medicine.", color: "from-primary to-accent" },
];

const AngelOracleGame = () => {
  const [phase, setPhase] = useState<"intro" | "picking" | "reveal">("intro");
  const [shuffled, setShuffled] = useState<typeof oracleCards>([]);
  const [picked, setPicked] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);

  const startGame = useCallback(() => {
    const s = [...oracleCards].sort(() => Math.random() - 0.5).slice(0, 6);
    setShuffled(s);
    setPicked([]);
    setFlipped([]);
    setPhase("picking");
  }, []);

  const pickCard = (idx: number) => {
    if (picked.includes(idx) || picked.length >= 3) return;
    const newPicked = [...picked, idx];
    setPicked(newPicked);
    setTimeout(() => setFlipped(f => [...f, idx]), 200);
    if (newPicked.length === 3) {
      setTimeout(() => setPhase("reveal"), 1200);
    }
  };

  const reset = () => {
    setPhase("intro");
    setPicked([]);
    setFlipped([]);
    setShuffled([]);
  };

  return (
    <section className="py-12 md:py-16 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-3">
            <Sparkles className="h-4 w-4" />
            Free Interactive Oracle Game
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
            🔮 Angel Number 333 Oracle Card Game
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto">
            Channel the energy of 333 and pick 3 oracle cards to receive your personalized divine message from the ascended masters.
          </p>

          {phase === "intro" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-gradient-spiritual text-primary-foreground rounded-full font-medium shadow-spiritual hover:shadow-elevated transition-all duration-300 text-sm"
              >
                ✨ Shuffle & Start — Pick 3 Cards
              </button>
              <p className="text-xs text-muted-foreground mt-3">Focus on a question, then tap to begin</p>
            </motion.div>
          )}

          {phase === "picking" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-sm font-medium text-foreground mb-4">
                Pick {3 - picked.length} more card{3 - picked.length !== 1 ? "s" : ""} — trust your intuition ✨
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
                {shuffled.map((card, idx) => {
                  const isFlipped = flipped.includes(idx);
                  const isPicked = picked.includes(idx);
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ rotateY: 0, scale: 0.8, opacity: 0 }}
                      animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.08 }}
                      className="perspective-500"
                    >
                      <button
                        onClick={() => pickCard(idx)}
                        disabled={isPicked || picked.length >= 3}
                        className={`relative w-full aspect-[2/3] rounded-xl border-2 transition-all duration-500 ${
                          isPicked
                            ? "border-primary shadow-spiritual"
                            : "border-border hover:border-primary/50 hover:shadow-card cursor-pointer"
                        } ${!isPicked && picked.length < 3 ? "hover:scale-105" : ""}`}
                      >
                        <AnimatePresence mode="wait">
                          {!isFlipped ? (
                            <motion.div
                              key="back"
                              initial={{ opacity: 1 }}
                              exit={{ opacity: 0, rotateY: 90 }}
                              className="absolute inset-0 bg-gradient-spiritual rounded-xl flex items-center justify-center"
                            >
                              <Star className="h-6 w-6 text-primary-foreground/80" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="front"
                              initial={{ opacity: 0, rotateY: -90 }}
                              animate={{ opacity: 1, rotateY: 0 }}
                              className="absolute inset-0 bg-card rounded-xl flex flex-col items-center justify-center p-2"
                            >
                              <span className="text-2xl mb-1">{card.emoji}</span>
                              <span className="text-[10px] font-serif font-semibold text-foreground leading-tight">{card.title}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {phase === "reveal" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-foreground">Your Divine 333 Oracle Reading</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {picked.map((idx, pos) => {
                  const card = shuffled[idx];
                  const labels = ["Past / Foundation", "Present / Now", "Future / Guidance"];
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: pos * 0.2 }}
                      className="bg-card rounded-xl border border-border p-4 shadow-card text-left"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{labels[pos]}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{card.emoji}</span>
                        <span className="font-serif font-bold text-foreground text-sm">{card.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{card.message}</p>
                    </motion.div>
                  );
                })}
              </div>
              <div className="p-4 rounded-xl bg-gradient-spiritual text-primary-foreground text-center mt-4">
                <p className="text-xs opacity-80 mb-1">Combined 333 Message</p>
                <p className="font-serif text-sm italic">
                  "The ascended masters have spoken through these three cards. Your journey from {shuffled[picked[0]]?.title.toLowerCase()} through {shuffled[picked[1]]?.title.toLowerCase()} leads to {shuffled[picked[2]]?.title.toLowerCase()}. Trust this divine path."
                </p>
              </div>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors mt-2"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Play Again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AngelOracleGame;
