import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/lib/i18n";
import PetCalculator from "./PetCalculator";

export default function PetsSection() {
  const { language } = useLanguage();

  return (
    <section id="pets-section" className="section-content">
      <div className="game-card p-5 mb-6">
        <h2 className="card-title text-xl mb-2">{translate('petFoodCalculator', language)}</h2>
        <p className="text-amber-200/70 mb-5 font-body">{translate('petFoodDescription', language)}</p>
        
        {/* Level Calculator */}
        <PetCalculator />
      </div>
    </section>
  );
}
