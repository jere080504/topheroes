import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/lib/i18n";
import HeroCalculator from "./HeroCalculator";

export default function HeroesSection() {
  const { language } = useLanguage();

  return (
    <section id="heroes-section" className="section-content">
      <div className="game-card p-5 mb-6">
        <h2 className="card-title text-xl mb-2">{translate('heroFoodCalculator', language)}</h2>
        <p className="text-amber-200/70 mb-5 font-body">{translate('heroFoodDescription', language)}</p>
        
        {/* Level Calculator */}
        <HeroCalculator />
      </div>
    </section>
  );
}
