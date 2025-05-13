import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/lib/i18n";
import { CastleLevel } from "@shared/schema";
import { Language } from "@/lib/i18n";

interface CastleDetailsProps {
  castleLevel: CastleLevel;
  language: Language;
}

export default function CastleDetails({ castleLevel, language }: CastleDetailsProps) {
  // Determine if required level is met
  const isRequirementMet = castleLevel.level > 1;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="game-card bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
        <h3 className="font-ui font-medium text-center mb-2">{translate('castleLevel', language)}</h3>
        <div className="font-heading text-4xl font-bold text-hero-blue">{castleLevel.level}</div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          {translate('upgradeToLevel', language, { level: castleLevel.level + 1 })}
        </p>
      </div>
      
      <div className="game-card bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
        <h3 className="font-ui font-medium text-center mb-2">{translate('buildTime', language)}</h3>
        <div className="font-heading text-4xl font-bold text-energy-red">{castleLevel.buildTime}</div>
        <p className="text-sm text-gray-600 mt-2 text-center">{translate('totalBuildTime', language)}</p>
      </div>
      
      <div className="game-card bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
        <h3 className="font-ui font-medium text-center mb-2">{translate('requiredCastleLevel', language)}</h3>
        <div className={`font-heading text-4xl font-bold ${isRequirementMet ? 'text-success' : 'text-error'}`}>
          {castleLevel.requiredLevel} {isRequirementMet ? '✓' : '✗'}
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">{translate('currentProgress', language)}</p>
      </div>
    </div>
  );
}
