import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/lib/i18n";
import CastleCalculator from "./CastleCalculator";

export default function CastleSection() {
  const { language } = useLanguage();

  return (
    <section id="castle-section" className="section-content">
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <h2 className="font-heading text-xl mb-4">{translate('castleUpgrades', language)}</h2>
        <p className="text-gray-600 mb-5 font-body">{translate('castleDescription', language)}</p>
        
        {/* Castle Calculator Component */}
        <CastleCalculator />
      </div>
    </section>
  );
}
