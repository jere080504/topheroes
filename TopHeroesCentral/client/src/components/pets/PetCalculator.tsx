import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/lib/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { API_ENDPOINTS, PET_LEVEL_RANGE, fetchPetFoodCalculation } from "@/lib/gameData";
import { formatNumber } from "@/lib/utils";

export default function PetCalculator() {
  const { language } = useLanguage();
  const [startLevel, setStartLevel] = useState(PET_LEVEL_RANGE.MIN);
  const [endLevel, setEndLevel] = useState(PET_LEVEL_RANGE.DEFAULT_END);
  
  // Generate level options for dropdowns
  const generateLevelOptions = (min: number, max: number) => {
    const options = [];
    for (let i = min; i <= max; i++) {
      options.push(i);
    }
    return options;
  };
  
  const startLevelOptions = generateLevelOptions(PET_LEVEL_RANGE.MIN, PET_LEVEL_RANGE.MAX - 1);
  const endLevelOptions = generateLevelOptions(startLevel + 1, PET_LEVEL_RANGE.MAX);
  
  // Fetch food calculation
  const { data, isLoading, error } = useQuery<{food: number}>({
    queryKey: [API_ENDPOINTS.PET_FOOD_CALC, startLevel, endLevel],
    queryFn: () => fetchPetFoodCalculation(startLevel, endLevel),
    enabled: startLevel < endLevel,
  });

  const foodRequired = data?.food || 0;
  
  // Handler for start level change
  const handleStartLevelChange = (value: string) => {
    const level = parseInt(value);
    setStartLevel(level);
    // If end level is now invalid, adjust it
    if (level >= endLevel) {
      setEndLevel(level + 1 <= PET_LEVEL_RANGE.MAX ? level + 1 : level);
    }
  };
  
  // Handler for end level change
  const handleEndLevelChange = (value: string) => {
    const level = parseInt(value);
    setEndLevel(level);
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {language === 'es' ? 'Calculadora de Mascotas' : 'Pet Calculator'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-200">
              {translate('currentToDesiredLevel', language)}
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-40">
                <Select 
                  value={startLevel.toString()} 
                  onValueChange={handleStartLevelChange}
                >
                  <SelectTrigger className="text-lg py-5">
                    <SelectValue placeholder={translate('currentLevel', language)} />
                  </SelectTrigger>
                  <SelectContent>
                    {startLevelOptions.map(level => (
                      <SelectItem key={`pet-start-${level}`} value={level.toString()}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <span className="text-amber-400 font-bold text-xl">→</span>
              
              <div className="w-40">
                <Select 
                  value={endLevel.toString()} 
                  onValueChange={handleEndLevelChange}
                >
                  <SelectTrigger className="text-lg py-5">
                    <SelectValue placeholder={translate('targetLevel', language)} />
                  </SelectTrigger>
                  <SelectContent>
                    {endLevelOptions.map(level => (
                      <SelectItem key={`pet-end-${level}`} value={level.toString()}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="result-container flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3014/3014457.png" 
                alt="Pet Food icon" 
                className="w-14 h-14 object-cover rounded-full p-1 bg-gradient-to-br from-green-200/20 to-green-800/30 border border-green-500/30" 
              />
              <div className="ml-3">
                <h4 className="font-ui font-medium text-amber-300">{translate('petFood', language)}</h4>
                <p className="text-amber-200/70 text-sm">{translate('fromLevelToLevel', language, { start: startLevel, end: endLevel })}</p>
              </div>
            </div>
            <div className="result-value">
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : error ? (
                <span className="text-red-500">Error</span>
              ) : (
                formatNumber(foodRequired)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
