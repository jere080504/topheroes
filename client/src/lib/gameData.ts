import { apiRequest } from "./queryClient";
import { type Hero, type Pet, type CastleLevel, type CastleUnlock } from "@shared/schema";

// API endpoints
export const API_ENDPOINTS = {
  HEROES: "/api/heroes",
  HERO_FOOD_CALC: "/api/heroes/food-calculation",
  PETS: "/api/pets",
  PET_FOOD_CALC: "/api/pets/food-calculation",
  CASTLE_LEVELS: "/api/castle-levels",
  CASTLE_UNLOCKS: "/api/castle-unlocks",
};

// Constants for level ranges
export const HERO_LEVEL_RANGE = {
  MIN: 1,
  MAX: 230,
  DEFAULT_END: 60
};

export const PET_LEVEL_RANGE = {
  MIN: 1,
  MAX: 60,
  DEFAULT_END: 30
};

export const CASTLE_LEVEL_RANGE = {
  MIN: 1,
  MAX: 40,
  DEFAULT: 6
};

// Game information (basado en la wiki oficial https://topheroes1.fandom.com/wiki/Top_Heroes_Wiki)
export const GAME_INFO = {
  DESCRIPTION: "Top Heroes es un juego de rol y estrategia donde coleccionas héroes de diferentes facciones, mejoras tus mascotas y desarrollas tu reino. Cada elemento tiene un sistema de niveles y mejoras que requieren recursos específicos para avanzar en el juego.",
  HERO_FACTIONS: [
    { name: "Liga", nameEn: "League", description: "Héroes nobles y disciplinados que siguen un estricto código de honor y justicia." },
    { name: "Naturaleza", nameEn: "Nature", description: "Héroes conectados con los elementos naturales y la magia elemental." },
    { name: "Horda", nameEn: "Horde", description: "Guerreros salvajes y criaturas feroces conocidos por su fuerza bruta y táctica agresiva." }
  ],
  HERO_TYPES: [
    { name: "Guerreros", nameEn: "Warriors", description: "Combatientes cuerpo a cuerpo como Knight, Warrior y otros campeones de batalla." },
    { name: "Magos", nameEn: "Mages", description: "Lanzadores de hechizos como Wizard, Pyromancer y otros que dominan las artes arcanas." },
    { name: "Apoyo", nameEn: "Support", description: "Héroes especializados como Bishop, Bard y otros que potencian a sus aliados." },
    { name: "Exploradores", nameEn: "Rangers", description: "Maestros del arco y la evasión como Ranger, que atacan desde la distancia." }
  ],
  PET_TYPES: [
    { name: "Ataque", nameEn: "Attack", description: "Mascotas que aumentan el daño y la precisión de tus héroes, ideales para estrategias ofensivas." },
    { name: "Defensa", nameEn: "Defense", description: "Mascotas que aumentan la armadura y resistencia de tus héroes, protegiendo a tu equipo en batallas." },
    { name: "Soporte", nameEn: "Support", description: "Mascotas que proporcionan efectos especiales, curación y bonificaciones para todo el equipo." }
  ],
  CASTLE_FEATURES: [
    "Mejora las instalaciones para producir más recursos por hora",
    "Desbloquea nuevos edificios para entrenar y mejorar tus héroes",
    "Investiga nuevas tecnologías para aumentar el poder de tu ejército",
    "Fortalece las defensas para protegerte de invasores y otras amenazas",
    "Expande tu territorio para acceder a recursos raros y ubicaciones especiales"
  ],
  HERO_RARITIES: [
    { name: "Mítico", nameEn: "Mythic", description: "Los héroes más raros y poderosos del juego, con habilidades excepcionales." },
    { name: "Legendario", nameEn: "Legendary", description: "Héroes de gran poder que pueden cambiar el curso de una batalla." },
    { name: "Épico", nameEn: "Epic", description: "Héroes fuertes con habilidades especiales y estadísticas superiores." },
    { name: "Raro", nameEn: "Rare", description: "Héroes con buenas estadísticas y utilidad en combate." }
  ],
  HERO_FOOD_INFO: "El alimento para héroes es un recurso esencial que permite a tus personajes subir de nivel. A mayor nivel del héroe, mayor será la cantidad de alimento requerido para la siguiente mejora. Los héroes de mayor rareza (Mítico, Legendario) requieren más alimento que los de menor rareza (Épico, Raro).",
  PET_FOOD_INFO: "El alimento para mascotas es un recurso especial que solo se puede conseguir en misiones específicas o eventos. Las mascotas consumen menos alimento que los héroes pero son igual de importantes para tu estrategia general."
};

// API functions
export async function fetchHeroes(): Promise<Hero[]> {
  const response = await fetch(API_ENDPOINTS.HEROES, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to load heroes");
  return response.json();
}

export async function fetchHeroFoodCalculation(startLevel: number, endLevel: number): Promise<{ food: number }> {
  const url = `${API_ENDPOINTS.HERO_FOOD_CALC}?startLevel=${startLevel}&endLevel=${endLevel}`;
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to calculate hero food");
  return response.json();
}

export async function fetchPets(): Promise<Pet[]> {
  const response = await fetch(API_ENDPOINTS.PETS, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to load pets");
  return response.json();
}

export async function fetchPetFoodCalculation(startLevel: number, endLevel: number): Promise<{ food: number }> {
  const url = `${API_ENDPOINTS.PET_FOOD_CALC}?startLevel=${startLevel}&endLevel=${endLevel}`;
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to calculate pet food");
  return response.json();
}

export async function fetchCastleLevels(): Promise<CastleLevel[]> {
  const response = await fetch(API_ENDPOINTS.CASTLE_LEVELS, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to load castle levels");
  return response.json();
}

export async function fetchCastleLevel(level: number): Promise<CastleLevel> {
  const response = await fetch(`${API_ENDPOINTS.CASTLE_LEVELS}/${level}`, { credentials: "include" });
  if (!response.ok) throw new Error(`Failed to load castle level ${level}`);
  return response.json();
}

export async function fetchCastleUnlocks(level: number): Promise<CastleUnlock[]> {
  const response = await fetch(`${API_ENDPOINTS.CASTLE_UNLOCKS}?level=${level}`, { credentials: "include" });
  if (!response.ok) throw new Error(`Failed to load castle unlocks for level ${level}`);
  return response.json();
}
