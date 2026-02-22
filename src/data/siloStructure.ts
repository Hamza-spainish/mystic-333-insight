import { allBlogPosts } from "./blogPosts";
import type { BlogPost } from "./blogPosts";

// ─── Silo Definitions ───────────────────────────────────────
// Each silo has a pillar page (hub) and spoke pages (supporting content)

export interface Silo {
  id: string;
  label: string;
  description: string;
  pillarSlug: string; // The main pillar page slug
  spokePatterns: string[]; // slug patterns that belong to this silo
}

// Number-based silos (pillar = main angel-number-XXX page)
export const numberSilos: Silo[] = [
  { id: "111", label: "Angel Number 111", description: "New beginnings & manifestation", pillarSlug: "angel-number-111", spokePatterns: ["111-meaning", "angel-number-1111", "angel-number-11"] },
  { id: "222", label: "Angel Number 222", description: "Balance & partnerships", pillarSlug: "angel-number-222", spokePatterns: ["222-meaning", "angel-number-2222", "angel-number-22"] },
  { id: "333", label: "Angel Number 333", description: "Spiritual growth & creativity", pillarSlug: "", spokePatterns: ["333-", "what-does-333", "why-you-keep-seeing-333"] }, // Homepage is pillar
  { id: "444", label: "Angel Number 444", description: "Protection & stability", pillarSlug: "angel-number-444", spokePatterns: ["444-meaning", "angel-number-4444", "angel-number-44"] },
  { id: "555", label: "Angel Number 555", description: "Change & transformation", pillarSlug: "angel-number-555", spokePatterns: ["555-meaning", "angel-number-5555", "angel-number-55"] },
  { id: "666", label: "Angel Number 666", description: "Balance & harmony", pillarSlug: "angel-number-666", spokePatterns: ["666-meaning", "angel-number-6666", "angel-number-66"] },
  { id: "777", label: "Angel Number 777", description: "Wisdom & enlightenment", pillarSlug: "angel-number-777", spokePatterns: ["777-meaning", "angel-number-7777", "angel-number-77"] },
  { id: "888", label: "Angel Number 888", description: "Abundance & prosperity", pillarSlug: "angel-number-888", spokePatterns: ["888-meaning", "angel-number-8888", "angel-number-88"] },
  { id: "999", label: "Angel Number 999", description: "Completion & purpose", pillarSlug: "angel-number-999", spokePatterns: ["999-meaning", "angel-number-9999", "angel-number-99"] },
];

// Topic-based silos
export interface TopicSilo {
  id: string;
  label: string;
  emoji: string;
  keywords: string[]; // slug keywords that match this topic
  hubSlug?: string; // optional cross-number hub page
}

export const topicSilos: TopicSilo[] = [
  { id: "love", label: "Love & Relationships", emoji: "❤️", keywords: ["love", "romantic", "soulmate", "relationship", "breakup", "friendship"], hubSlug: "angel-numbers-and-love" },
  { id: "twin-flame", label: "Twin Flame", emoji: "🔥", keywords: ["twin-flame", "twin_flame", "soul-mission", "karmic", "spiritual-partner"], hubSlug: "angel-numbers-twin-flame-guide" },
  { id: "career", label: "Career & Success", emoji: "💼", keywords: ["career", "success", "entrepreneur", "business", "motivation", "productivity", "goals", "achieving"], hubSlug: "angel-numbers-and-career" },
  { id: "money", label: "Money & Abundance", emoji: "💰", keywords: ["money", "abundance", "financial", "wealth", "manifest-desires", "manifestation"], hubSlug: "angel-numbers-and-money" },
  { id: "spiritual", label: "Spiritual Growth", emoji: "✨", keywords: ["spiritual", "awakening", "numerology", "ascended", "master-number", "symbolism", "hidden-messages", "bible", "biblical", "astrology", "meditation", "mindfulness", "prayer", "chakra"], hubSlug: "how-to-interpret-angel-numbers" },
  { id: "life", label: "Life Changes", emoji: "🌟", keywords: ["life-transition", "feeling-stuck", "life-decision", "big-changes", "new-beginning", "life-purpose", "hard-times", "positive", "stress", "anxiety", "healing", "self-love", "inner-peace", "wellbeing", "personal-growth", "emotional"], hubSlug: "seeing-angel-numbers-everyday" },
  { id: "daily", label: "Daily Life & Fun", emoji: "🎯", keywords: ["daily-life", "how-to-respond", "journal", "social-media", "fun-facts", "meme", "popular-culture", "real-life", "dreams", "thinking-of-someone", "attract-positive", "energy", "messages-from-angels"], hubSlug: undefined },
];

// ─── Helper Functions ────────────────────────────────────────

/** Get the number silo a post belongs to based on its number field */
function getNumberSiloForPost(post: BlogPost): Silo | undefined {
  // Direct number match
  const directMatch = numberSilos.find(s => s.id === post.number);
  if (directMatch) return directMatch;
  // Pattern match on slug
  return numberSilos.find(s => s.spokePatterns.some(p => post.slug.includes(p)));
}

/** Get the topic silo a post belongs to based on slug keywords */
function getTopicSiloForPost(post: BlogPost): TopicSilo | undefined {
  return topicSilos.find(t => t.keywords.some(k => post.slug.includes(k)));
}

/** Get all posts in the same number silo */
export function getSameNumberSiloPosts(currentSlug: string, limit = 6): BlogPost[] {
  const current = allBlogPosts.find(p => p.slug === currentSlug);
  if (!current) return [];
  const silo = getNumberSiloForPost(current);
  if (!silo) return [];
  
  return allBlogPosts
    .filter(p => p.slug !== currentSlug && getNumberSiloForPost(p)?.id === silo.id)
    .slice(0, limit);
}

/** Get all posts in the same topic silo (across all numbers) */
export function getSameTopicSiloPosts(currentSlug: string, limit = 4): BlogPost[] {
  const current = allBlogPosts.find(p => p.slug === currentSlug);
  if (!current) return [];
  const topic = getTopicSiloForPost(current);
  if (!topic) return [];
  
  return allBlogPosts
    .filter(p => p.slug !== currentSlug && topic.keywords.some(k => p.slug.includes(k)))
    .slice(0, limit);
}

/** Get the pillar page URL for a post's number silo */
export function getPillarUrl(currentSlug: string): { url: string; label: string } | null {
  const current = allBlogPosts.find(p => p.slug === currentSlug);
  if (!current) return null;
  const silo = getNumberSiloForPost(current);
  if (!silo) return null;
  if (silo.id === "333") return { url: "/", label: "Angel Number 333 Complete Guide" };
  if (silo.pillarSlug === currentSlug) return null; // Already on pillar
  return { url: `/${silo.pillarSlug}`, label: `${silo.label} Complete Guide` };
}

/** Get the topic hub URL for a post */
export function getTopicHubUrl(currentSlug: string): { url: string; label: string } | null {
  const current = allBlogPosts.find(p => p.slug === currentSlug);
  if (!current) return null;
  const topic = getTopicSiloForPost(current);
  if (!topic || !topic.hubSlug || topic.hubSlug === currentSlug) return null;
  return { url: `/${topic.hubSlug}`, label: `${topic.emoji} ${topic.label} Guide` };
}

/** Get cross-silo links (other number pillars) */
export function getCrossSiloLinks(currentSlug: string, limit = 4): { slug: string; label: string }[] {
  const current = allBlogPosts.find(p => p.slug === currentSlug);
  const currentSilo = current ? getNumberSiloForPost(current) : null;
  
  return numberSilos
    .filter(s => s.id !== currentSilo?.id && s.id !== "333")
    .map(s => ({ slug: s.pillarSlug, label: s.label }))
    .slice(0, limit);
}

/** Get all posts grouped by topic silo for the blogs page */
export function getPostsByTopicSilo(): { silo: TopicSilo; posts: BlogPost[] }[] {
  return topicSilos.map(silo => ({
    silo,
    posts: allBlogPosts.filter(p => silo.keywords.some(k => p.slug.includes(k))),
  })).filter(g => g.posts.length > 0);
}

/** Get all posts grouped by number silo */
export function getPostsByNumberSilo(): { silo: Silo; posts: BlogPost[] }[] {
  return numberSilos.map(silo => ({
    silo,
    posts: allBlogPosts.filter(p => getNumberSiloForPost(p)?.id === silo.id),
  })).filter(g => g.posts.length > 0);
}
