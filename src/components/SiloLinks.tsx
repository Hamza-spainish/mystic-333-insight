import { Link } from "react-router-dom";
import { ArrowRight, Compass, Layers } from "lucide-react";
import {
  getSameNumberSiloPosts,
  getSameTopicSiloPosts,
  getPillarUrl,
  getTopicHubUrl,
  getCrossSiloLinks,
} from "@/data/siloStructure";

interface SiloLinksProps {
  currentSlug: string;
}

const SiloLinks = ({ currentSlug }: SiloLinksProps) => {
  const pillar = getPillarUrl(currentSlug);
  const topicHub = getTopicHubUrl(currentSlug);
  const numberSiblings = getSameNumberSiloPosts(currentSlug, 6);
  const topicSiblings = getSameTopicSiloPosts(currentSlug, 4);
  const crossSilo = getCrossSiloLinks(currentSlug, 4);

  return (
    <div className="space-y-8 mb-10">
      {/* Pillar & Hub links (upward links in silo) */}
      {(pillar || topicHub) && (
        <div className="flex flex-wrap gap-3">
          {pillar && (
            <Link
              to={pillar.url}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-spiritual text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Compass className="h-4 w-4" />
              {pillar.label}
            </Link>
          )}
          {topicHub && (
            <Link
              to={topicHub.url}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              <Layers className="h-4 w-4" />
              {topicHub.label}
            </Link>
          )}
        </div>
      )}

      {/* Same number silo posts */}
      {numberSiblings.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">
            More in This Angel Number Series
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {numberSiblings.map((post) => (
              <Link
                key={post.slug}
                to={`/${post.slug}`}
                className="block p-3 bg-card rounded-lg border border-border hover:shadow-card hover:border-primary/30 transition-all group"
              >
                <span className="text-sm text-primary font-medium group-hover:underline line-clamp-2 flex items-start gap-1.5">
                  <ArrowRight className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Same topic silo posts (cross-number) */}
      {topicSiblings.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">
            Related by Topic
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topicSiblings.map((post) => (
              <Link
                key={post.slug}
                to={`/${post.slug}`}
                className="block p-3 bg-secondary/50 rounded-lg border border-border hover:shadow-card hover:border-primary/30 transition-all group"
              >
                <span className="text-sm text-primary font-medium group-hover:underline line-clamp-2 flex items-start gap-1.5">
                  <ArrowRight className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Cross-silo links (other number pillars) */}
      {crossSilo.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground mb-4">
            Explore Other Angel Numbers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {crossSilo.map((link) => (
              <Link
                key={link.slug}
                to={`/${link.slug}`}
                className="text-center p-3 bg-card rounded-lg border border-border hover:shadow-card hover:border-primary/30 transition-all text-sm text-primary font-medium hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SiloLinks;
