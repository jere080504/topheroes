import { generateStars, getRarityColorClass, getTypeColorClass } from "@/lib/utils";
import { Language } from "@/lib/i18n";
import { Pet } from "@shared/schema";

interface PetCardProps {
  pet: Pet;
  language: Language;
}

export default function PetCard({ pet, language }: PetCardProps) {
  // Use localized content based on language
  const name = pet.name;
  const type = language === 'es' ? pet.type : pet.typeEn;
  const rarity = language === 'es' ? pet.rarity : pet.rarityEn;
  
  const typeColorClass = getTypeColorClass(type);
  const starsColorClass = getRarityColorClass(rarity);

  return (
    <div 
      className="game-card rounded-lg shadow-md overflow-hidden cursor-pointer hover:translate-y-[-3px] transition-all duration-300"
      data-pet-id={pet.id}
    >
      <div className={`h-32 bg-gradient-to-r ${pet.backgroundClass} relative`}>
        <img 
          src={pet.image} 
          alt={name} 
          className="w-full h-full object-cover object-center mix-blend-overlay opacity-90" 
        />
        <span className={`absolute top-2 right-2 ${typeColorClass} text-xs font-bold px-2 py-1 rounded-full`}>
          {type}
        </span>
      </div>
      <div className="p-3">
        <h4 className="font-heading font-bold">{name}</h4>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-600 font-ui">{rarity}</span>
          <div className="flex">
            <span className={starsColorClass}>
              {generateStars(pet.stars)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
