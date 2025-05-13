// Language strings for the application
export const translations = {
  es: {
    // General
    appTitle: "Top Heroes Calculator",
    nonOfficialGuide: "Esta es una calculadora no oficial para el juego Top Heroes.",
    
    // Navigation
    heroes: "Héroes",
    pets: "Mascotas",
    castle: "Castillo",
    
    // Heroes Section
    heroFoodCalculator: "Calculadora de Alimento para Héroes",
    heroFoodDescription: "Calcula la cantidad de comida necesaria para subir de nivel a tus héroes.",
    searchHero: "Buscar héroe...",
    allFactions: "Todas las facciones",
    league: "Liga",
    nature: "Naturaleza",
    horde: "Horda",
    allRarities: "Todas las rarezas",
    mythic: "Mítico",
    legendary: "Legendario",
    epic: "Épico",
    rare: "Raro",
    common: "Común",
    currentToDesiredLevel: "Nivel Actual → Nivel Deseado",
    currentLevel: "Nivel Actual",
    targetLevel: "Nivel Objetivo",
    foodRequired: "Alimento Requerido",
    fromLevelToLevel: "De nivel {start} a {end}",
    selectHero: "Selecciona un Héroe",
    
    // Pets Section
    petFoodCalculator: "Calculadora de Alimento para Mascotas",
    petFoodDescription: "Calcula la cantidad de comida necesaria para subir de nivel a tus mascotas.",
    searchPet: "Buscar mascota...",
    allTypes: "Todos los tipos",
    attack: "Ataque",
    defense: "Defensa",
    support: "Soporte",
    petFood: "Alimento para Mascotas",
    selectPet: "Selecciona una Mascota",
    
    // Castle Section
    castleUpgrades: "Mejoras del Castillo",
    castleDescription: "Descubre qué recursos necesitas para mejorar tu castillo.",
    castleLevel: "Nivel del Castillo",
    castleLevelInfo: "Detalles del Nivel {level}",
    buildTime: "Tiempo de Construcción",
    requiredLevel: "Nivel {level} Requerido",
    requiredCastleLevel: "Nivel de Castillo Requerido",
    currentProgress: "Progreso actual",
    totalBuildTime: "Tiempo total de mejora",
    upgradeToLevel: "Mejora al nivel {level}",
    resourcesRequired: "Recursos Necesarios",
    gems: "Gemas",
    crystals: "Cristales",
    elixir: "Elixir",
    mana: "Maná",
    unlocks: "Desbloquea",
    newBuildings: "Nuevos Edificios",
    newResearch: "Nuevas Investigaciones",
  },
  en: {
    // General
    appTitle: "Top Heroes Calculator",
    nonOfficialGuide: "This is an unofficial calculator for the Top Heroes game.",
    
    // Navigation
    heroes: "Heroes",
    pets: "Pets",
    castle: "Castle",
    
    // Heroes Section
    heroFoodCalculator: "Hero Food Calculator",
    heroFoodDescription: "Calculate the amount of food needed to level up your heroes.",
    searchHero: "Search hero...",
    allFactions: "All factions",
    league: "League",
    nature: "Nature",
    horde: "Horde",
    allRarities: "All rarities",
    mythic: "Mythic",
    legendary: "Legendary",
    epic: "Epic",
    rare: "Rare",
    common: "Common",
    currentToDesiredLevel: "Current Level → Desired Level",
    currentLevel: "Current Level",
    targetLevel: "Target Level",
    foodRequired: "Food Required",
    fromLevelToLevel: "From level {start} to {end}",
    selectHero: "Select a Hero",
    
    // Pets Section
    petFoodCalculator: "Pet Food Calculator",
    petFoodDescription: "Calculate the amount of food needed to level up your pets.",
    searchPet: "Search pet...",
    allTypes: "All types",
    attack: "Attack",
    defense: "Defense",
    support: "Support",
    petFood: "Pet Food",
    selectPet: "Select a Pet",
    
    // Castle Section
    castleUpgrades: "Castle Upgrades",
    castleDescription: "Discover what resources you need to upgrade your castle.",
    castleLevel: "Castle Level",
    castleLevelInfo: "Level {level} Details",
    buildTime: "Build Time",
    requiredLevel: "Level {level} Required",
    requiredCastleLevel: "Required Castle Level",
    currentProgress: "Current progress",
    totalBuildTime: "Total build time",
    upgradeToLevel: "Upgrade to level {level}",
    resourcesRequired: "Resources Required",
    gems: "Gems",
    crystals: "Crystals",
    elixir: "Elixir",
    mana: "Mana",
    unlocks: "Unlocks",
    newBuildings: "New Buildings",
    newResearch: "New Research",
  }
};

export type Language = 'es' | 'en';
export type TranslationKey = keyof typeof translations.es;

export function translate(key: TranslationKey, lang: Language, params?: Record<string, string | number>): string {
  let text = translations[lang][key] || key;
  
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, String(value));
    });
  }
  
  return text;
}
