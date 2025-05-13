import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/lib/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { API_ENDPOINTS, CASTLE_LEVEL_RANGE, fetchCastleLevel, fetchCastleUnlocks } from "@/lib/gameData";
import { formatNumber } from "@/lib/utils";
import ResourceCard from "./ResourceCard";
import { CastleLevel, CastleUnlock } from "@shared/schema";

export default function CastleCalculator() {
  const { language } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState(CASTLE_LEVEL_RANGE.DEFAULT);
  
  // Generate level options for dropdowns
  const generateLevelOptions = (min: number, max: number) => {
    const options = [];
    for (let i = min; i <= max; i++) {
      options.push(i);
    }
    return options;
  };
  
  const levelOptions = generateLevelOptions(CASTLE_LEVEL_RANGE.MIN, CASTLE_LEVEL_RANGE.MAX);
  
  // Fetch castle level details
  const { data: castleLevel, isLoading: isLoadingLevel } = useQuery<CastleLevel>({
    queryKey: [API_ENDPOINTS.CASTLE_LEVELS, selectedLevel],
    queryFn: () => fetchCastleLevel(selectedLevel)
  });
  
  // Fetch castle unlocks for this level
  const { data: castleUnlocks = [] as CastleUnlock[], isLoading: isLoadingUnlocks } = useQuery<CastleUnlock[]>({
    queryKey: [API_ENDPOINTS.CASTLE_UNLOCKS, selectedLevel],
    queryFn: () => fetchCastleUnlocks(selectedLevel)
  });
  
  // Group unlocks by category
  const groupedUnlocks = castleUnlocks.reduce((acc: any, unlock) => {
    const category = language === 'es' ? unlock.category : unlock.categoryEn;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(unlock);
    return acc;
  }, {});
  
  const handleLevelChange = (value: string) => {
    const level = parseInt(value);
    setSelectedLevel(level);
  };

  return (
    <div className="calculator-container mb-6">
      <h3 className="calculator-title">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="calculator-icon h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
          />
        </svg>
        {language === 'es' ? 'Calculadora de Castillo' : 'Castle Calculator'}
      </h3>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-200">
              {translate('castleLevel', language)}
            </label>
            <div className="flex items-center">
              <div className="w-40">
                <Select 
                  value={selectedLevel.toString()} 
                  onValueChange={handleLevelChange}
                >
                  <SelectTrigger className="text-lg py-5">
                    <SelectValue placeholder={translate('castleLevel', language)} />
                  </SelectTrigger>
                  <SelectContent>
                    {levelOptions.map(level => (
                      <SelectItem key={`level-${level}`} value={level.toString()}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Castle Details Display */}
        {isLoadingLevel ? (
          <div className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
          </div>
        ) : castleLevel ? (
          <div className="game-card p-5">
            {/* Castle Level Info Header */}
            <div className="flex items-center justify-between mb-6 p-4 bg-gray-800/50 rounded-lg border border-amber-900/20">
              <div>
                <h3 className="font-heading text-lg text-amber-300">
                  {translate('castleLevelInfo', language, { level: selectedLevel })}
                </h3>
                <p className="text-amber-200/70 text-sm">{castleLevel.buildTime} {translate('buildTime', language)}</p>
              </div>
              {selectedLevel > 1 && (
                <div className="text-sm text-amber-200/80 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-900/30">
                  {translate('requiredLevel', language, { level: castleLevel.requiredLevel })}
                </div>
              )}
            </div>
            
            {/* Resources Required */}
            <h3 className="font-heading text-lg mb-4">{translate('resourcesRequired', language)}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <ResourceCard
                name="Piedra"
                value={castleLevel.stone}
                iconUrl="https://cdn-icons-png.flaticon.com/512/2908/2908892.png"
                colorClass="text-stone-500"
              />
              <ResourceCard
                name="Madera"
                value={castleLevel.wood}
                iconUrl="https://cdn-icons-png.flaticon.com/512/3522/3522774.png"
                colorClass="text-amber-700"
              />
              <ResourceCard
                name="Rubí"
                value={castleLevel.ruby}
                iconUrl="https://cdn-icons-png.flaticon.com/512/7477/7477790.png"
                colorClass="text-rose-600"
              />
            </div>
            
            {/* Unlocks */}
            {isLoadingUnlocks ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              </div>
            ) : castleUnlocks.length > 0 ? (
              <>
                <h3 className="font-heading text-lg mb-4">{translate('unlocks', language)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(groupedUnlocks).map(([category, unlocks]: [string, any]) => (
                    <div key={category} className="bg-gray-800/40 p-4 rounded-lg hover:shadow-amber-900/20 hover:shadow-lg transition-shadow duration-300">
                      <h4 className="font-ui font-medium mb-3 text-amber-300 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        {category === 'Edificios' || category === 'Buildings' 
                          ? translate('newBuildings', language) 
                          : translate('newResearch', language)}
                      </h4>
                      <ul className="space-y-3 text-sm text-amber-200/90">
                        {unlocks.map((unlock: any) => (
                          <li key={unlock.id} className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 bg-amber-500`}></span>
                            {language === 'es' ? unlock.name : unlock.nameEn}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center p-4 text-gray-500">
                {language === 'es' ? 'No hay desbloqueos para este nivel de castillo' : 'No unlocks for this castle level'}
              </div>
            )}
          </div>
        ) : (
          <div className="p-5 text-center text-red-500">
            {language === 'es' ? 'Error al cargar los datos del castillo' : 'Error loading castle level data'}
          </div>
        )}
      </div>
    </div>
  );
}