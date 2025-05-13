import { cn, generateStars, getRarityBadgeClass, getRarityColorClass } from "@/lib/utils";
import { Language } from "@/lib/i18n";
import { Hero } from "@shared/schema";

interface HeroCardProps {
  hero: Hero;
  language: Language;
}

export default function HeroCard({ hero, language }: HeroCardProps) {
  // Use localized content based on language
  const name = hero.name;
  const faction = language === 'es' ? hero.faction : hero.factionEn;
  const rarity = language === 'es' ? hero.rarity : hero.rarityEn;
  
  const rarityBadgeClass = getRarityBadgeClass(rarity);
  const starsColorClass = getRarityColorClass(rarity);

  return (
    <div 
      className="game-card rounded-lg shadow-md overflow-hidden cursor-pointer hover:translate-y-[-3px] transition-all duration-300"
      data-hero-id={hero.id}
    >
      <div className={`h-32 bg-gradient-to-r ${hero.backgroundClass} relative`}>
        <img 
          src={hero.image} 
          alt={name} 
          className="w-full h-full object-cover object-center mix-blend-overlay opacity-90" 
        />
        <span className={`absolute top-2 right-2 ${rarityBadgeClass} text-xs font-bold px-2 py-1 rounded-full`}>
          {rarity}
        </span>
      </div>
      <div className="p-3">
        <h4 className="font-heading font-bold">{name}</h4>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-600 font-ui">{faction}</span>
          <div className="flex">
            <span className={starsColorClass}>
              {generateStars(hero.stars)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
