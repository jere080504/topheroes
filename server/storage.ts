import {
  type Hero, type InsertHero,
  type HeroFoodRequirement, type InsertHeroFoodRequirement,
  type Pet, type InsertPet,
  type PetFoodRequirement, type InsertPetFoodRequirement,
  type CastleLevel, type InsertCastleLevel,
  type CastleUnlock, type InsertCastleUnlock
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // Heroes
  getHeroes(): Promise<Hero[]>;
  getHero(id: number): Promise<Hero | undefined>;
  createHero(hero: InsertHero): Promise<Hero>;
  
  // Hero Food Requirements
  getHeroFoodRequirements(): Promise<HeroFoodRequirement[]>;
  calculateHeroFood(startLevel: number, endLevel: number): Promise<number>;
  createHeroFoodRequirement(req: InsertHeroFoodRequirement): Promise<HeroFoodRequirement>;
  
  // Pets
  getPets(): Promise<Pet[]>;
  getPet(id: number): Promise<Pet | undefined>;
  createPet(pet: InsertPet): Promise<Pet>;
  
  // Pet Food Requirements
  getPetFoodRequirements(): Promise<PetFoodRequirement[]>;
  calculatePetFood(startLevel: number, endLevel: number): Promise<number>;
  createPetFoodRequirement(req: InsertPetFoodRequirement): Promise<PetFoodRequirement>;
  
  // Castle
  getCastleLevels(): Promise<CastleLevel[]>;
  getCastleLevel(level: number): Promise<CastleLevel | undefined>;
  createCastleLevel(castleLevel: InsertCastleLevel): Promise<CastleLevel>;
  
  // Castle Unlocks
  getCastleUnlocks(): Promise<CastleUnlock[]>;
  getCastleUnlocksByLevel(level: number): Promise<CastleUnlock[]>;
  createCastleUnlock(unlock: InsertCastleUnlock): Promise<CastleUnlock>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private heroes: Map<number, Hero>;
  private heroFoodReqs: Map<number, HeroFoodRequirement>;
  private pets: Map<number, Pet>;
  private petFoodReqs: Map<number, PetFoodRequirement>;
  private castleLevels: Map<number, CastleLevel>;
  private castleUnlocks: Map<number, CastleUnlock>;
  
  private currentIds: {
    heroes: number;
    heroFoodReqs: number;
    pets: number;
    petFoodReqs: number;
    castleLevels: number;
    castleUnlocks: number;
  };

  constructor() {
    this.heroes = new Map();
    this.heroFoodReqs = new Map();
    this.pets = new Map();
    this.petFoodReqs = new Map();
    this.castleLevels = new Map();
    this.castleUnlocks = new Map();
    
    this.currentIds = {
      heroes: 1,
      heroFoodReqs: 1,
      pets: 1,
      petFoodReqs: 1,
      castleLevels: 1,
      castleUnlocks: 1
    };
    
    // Initialize with some data
    this.initializeData();
  }
  
  // Heroes
  async getHeroes(): Promise<Hero[]> {
    return Array.from(this.heroes.values());
  }
  
  async getHero(id: number): Promise<Hero | undefined> {
    return this.heroes.get(id);
  }
  
  async createHero(hero: InsertHero): Promise<Hero> {
    const id = this.currentIds.heroes++;
    const newHero: Hero = { ...hero, id };
    this.heroes.set(id, newHero);
    return newHero;
  }
  
  // Hero Food Requirements
  async getHeroFoodRequirements(): Promise<HeroFoodRequirement[]> {
    return Array.from(this.heroFoodReqs.values());
  }
  
  async calculateHeroFood(startLevel: number, endLevel: number): Promise<number> {
    const reqs = await this.getHeroFoodRequirements();
    
    // Ensure valid range
    if (startLevel >= endLevel) return 0;
    
    // Calculate food needed
    let totalFood = 0;
    for (let level = startLevel; level < endLevel; level++) {
      const req = reqs.find(r => r.level === level);
      if (req) {
        totalFood += req.food;
      }
    }
    
    return totalFood;
  }
  
  async createHeroFoodRequirement(req: InsertHeroFoodRequirement): Promise<HeroFoodRequirement> {
    const id = this.currentIds.heroFoodReqs++;
    const newReq: HeroFoodRequirement = { ...req, id };
    this.heroFoodReqs.set(id, newReq);
    return newReq;
  }
  
  // Pets
  async getPets(): Promise<Pet[]> {
    return Array.from(this.pets.values());
  }
  
  async getPet(id: number): Promise<Pet | undefined> {
    return this.pets.get(id);
  }
  
  async createPet(pet: InsertPet): Promise<Pet> {
    const id = this.currentIds.pets++;
    const newPet: Pet = { ...pet, id };
    this.pets.set(id, newPet);
    return newPet;
  }
  
  // Pet Food Requirements
  async getPetFoodRequirements(): Promise<PetFoodRequirement[]> {
    return Array.from(this.petFoodReqs.values());
  }
  
  async calculatePetFood(startLevel: number, endLevel: number): Promise<number> {
    const reqs = await this.getPetFoodRequirements();
    
    // Ensure valid range
    if (startLevel >= endLevel) return 0;
    
    // Calculate food needed
    let totalFood = 0;
    for (let level = startLevel; level < endLevel; level++) {
      const req = reqs.find(r => r.level === level);
      if (req) {
        totalFood += req.food;
      }
    }
    
    return totalFood;
  }
  
  async createPetFoodRequirement(req: InsertPetFoodRequirement): Promise<PetFoodRequirement> {
    const id = this.currentIds.petFoodReqs++;
    const newReq: PetFoodRequirement = { ...req, id };
    this.petFoodReqs.set(id, newReq);
    return newReq;
  }
  
  // Castle
  async getCastleLevels(): Promise<CastleLevel[]> {
    return Array.from(this.castleLevels.values());
  }
  
  async getCastleLevel(level: number): Promise<CastleLevel | undefined> {
    const levels = await this.getCastleLevels();
    return levels.find(l => l.level === level);
  }
  
  async createCastleLevel(castleLevel: InsertCastleLevel): Promise<CastleLevel> {
    const id = this.currentIds.castleLevels++;
    const newLevel: CastleLevel = { ...castleLevel, id };
    this.castleLevels.set(id, newLevel);
    return newLevel;
  }
  
  // Castle Unlocks
  async getCastleUnlocks(): Promise<CastleUnlock[]> {
    return Array.from(this.castleUnlocks.values());
  }
  
  async getCastleUnlocksByLevel(level: number): Promise<CastleUnlock[]> {
    const unlocks = await this.getCastleUnlocks();
    return unlocks.filter(u => u.castleLevel === level);
  }
  
  async createCastleUnlock(unlock: InsertCastleUnlock): Promise<CastleUnlock> {
    const id = this.currentIds.castleUnlocks++;
    const newUnlock: CastleUnlock = { ...unlock, id };
    this.castleUnlocks.set(id, newUnlock);
    return newUnlock;
  }
  
  // Initialize with sample data
  private async initializeData() {
    // Heroes
    await this.createHero({
      name: "Knight",
      nameEn: "Knight",
      faction: "Liga",
      factionEn: "League",
      rarity: "Legendario",
      rarityEn: "Legendary",
      stars: 5,
      image: "https://cdn-icons-png.flaticon.com/512/5338/5338106.png",
      backgroundClass: "from-hero-blue to-purple-600"
    });
    
    await this.createHero({
      name: "Pyromancer",
      nameEn: "Pyromancer",
      faction: "Naturaleza",
      factionEn: "Nature",
      rarity: "Mítico",
      rarityEn: "Mythic",
      stars: 5,
      image: "https://cdn-icons-png.flaticon.com/512/5338/5338031.png",
      backgroundClass: "from-purple-600 to-pink-500"
    });
    
    await this.createHero({
      name: "Ranger",
      nameEn: "Ranger",
      faction: "Liga",
      factionEn: "League",
      rarity: "Épico",
      rarityEn: "Epic",
      stars: 4,
      image: "https://cdn-icons-png.flaticon.com/512/5338/5338093.png",
      backgroundClass: "from-green-600 to-teal-500"
    });
    
    await this.createHero({
      name: "Warrior",
      nameEn: "Warrior",
      faction: "Horda",
      factionEn: "Horde",
      rarity: "Raro",
      rarityEn: "Rare",
      stars: 3,
      image: "https://cdn-icons-png.flaticon.com/512/5338/5338070.png",
      backgroundClass: "from-red-600 to-energy-red"
    });
    
    // Hero Food Requirements (simplified for demonstration)
    for (let i = 1; i <= 230; i++) {
      await this.createHeroFoodRequirement({
        level: i,
        food: Math.floor(100 * Math.pow(i, 1.5))
      });
    }
    
    // Pets
    await this.createPet({
      name: "Dragón de Fuego",
      nameEn: "Fire Dragon",
      type: "Ataque",
      typeEn: "Attack",
      rarity: "Mítico",
      rarityEn: "Mythic",
      stars: 5,
      image: "https://cdn-icons-png.flaticon.com/512/6119/6119003.png",
      backgroundClass: "from-yellow-500 to-gold"
    });
    
    await this.createPet({
      name: "Lobo Helado",
      nameEn: "Ice Wolf",
      type: "Soporte",
      typeEn: "Support",
      rarity: "Legendario",
      rarityEn: "Legendary",
      stars: 5,
      image: "https://cdn-icons-png.flaticon.com/512/616/616596.png",
      backgroundClass: "from-blue-400 to-hero-blue"
    });
    
    await this.createPet({
      name: "Tortuga de Piedra",
      nameEn: "Stone Turtle",
      type: "Defensa",
      typeEn: "Defense",
      rarity: "Épico",
      rarityEn: "Epic",
      stars: 4,
      image: "https://cdn-icons-png.flaticon.com/512/7127/7127195.png",
      backgroundClass: "from-green-300 to-green-500"
    });
    
    await this.createPet({
      name: "Águila Veloz",
      nameEn: "Swift Eagle",
      type: "Ataque",
      typeEn: "Attack",
      rarity: "Raro",
      rarityEn: "Rare",
      stars: 3,
      image: "https://cdn-icons-png.flaticon.com/512/4371/4371234.png",
      backgroundClass: "from-gray-400 to-gray-600"
    });
    
    // Pet Food Requirements (simplified for demonstration)
    for (let i = 1; i <= 60; i++) {
      await this.createPetFoodRequirement({
        level: i,
        food: Math.floor(80 * Math.pow(i, 1.5))
      });
    }
    
    // Castle Levels basados en datos reales del juego
    const castleLevelData = [
      { level: 1, stone: 0, wood: 0, ruby: 0, buildTime: "0h", requiredLevel: 0 },
      { level: 2, stone: 300, wood: 1500, ruby: 50, buildTime: "4h", requiredLevel: 1 },
      { level: 3, stone: 600, wood: 3000, ruby: 100, buildTime: "8h", requiredLevel: 2 },
      { level: 4, stone: 1200, wood: 6000, ruby: 200, buildTime: "12h", requiredLevel: 3 },
      { level: 5, stone: 2400, wood: 12000, ruby: 400, buildTime: "16h", requiredLevel: 4 },
      { level: 6, stone: 4800, wood: 24000, ruby: 800, buildTime: "24h", requiredLevel: 5 },
      { level: 7, stone: 9600, wood: 48000, ruby: 1600, buildTime: "36h", requiredLevel: 6 },
      { level: 8, stone: 19200, wood: 96000, ruby: 3200, buildTime: "48h", requiredLevel: 7 },
      { level: 9, stone: 38400, wood: 192000, ruby: 6400, buildTime: "60h", requiredLevel: 8 },
      { level: 10, stone: 76800, wood: 384000, ruby: 12800, buildTime: "72h", requiredLevel: 9 },
      { level: 11, stone: 153600, wood: 768000, ruby: 25600, buildTime: "96h", requiredLevel: 10 },
      { level: 12, stone: 307200, wood: 1536000, ruby: 51200, buildTime: "120h", requiredLevel: 11 },
      { level: 13, stone: 614400, wood: 3072000, ruby: 102400, buildTime: "144h", requiredLevel: 12 },
      { level: 14, stone: 1228800, wood: 6144000, ruby: 204800, buildTime: "168h", requiredLevel: 13 },
      { level: 15, stone: 2457600, wood: 12288000, ruby: 409600, buildTime: "192h", requiredLevel: 14 }
    ];
    
    for (const data of castleLevelData) {
      await this.createCastleLevel(data);
    }
    
    // Castle Unlocks basados en datos reales del juego
    // Nivel 2
    await this.createCastleUnlock({
      castleLevel: 2,
      name: "Muro Nivel 2",
      nameEn: "Wall Level 2",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 2,
      name: "Cuartel Nivel 2",
      nameEn: "Barracks Level 2",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 2,
      name: "Recolección de Recursos +5%",
      nameEn: "Resource Gathering +5%",
      category: "Investigaciones",
      categoryEn: "Research",
      color: "bg-energy-red"
    });
    
    // Nivel 3
    await this.createCastleUnlock({
      castleLevel: 3,
      name: "Academia de Héroes",
      nameEn: "Hero Academy",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 3,
      name: "Mercado Nivel 1",
      nameEn: "Market Level 1",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 3,
      name: "Entrenamiento de Infantería +5%",
      nameEn: "Infantry Training +5%",
      category: "Investigaciones",
      categoryEn: "Research",
      color: "bg-energy-red"
    });
    
    // Nivel 4
    await this.createCastleUnlock({
      castleLevel: 4,
      name: "Torre de Guardia Nivel 3",
      nameEn: "Watch Tower Level 3",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 4,
      name: "Fundición Nivel 3",
      nameEn: "Foundry Level 3",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 4,
      name: "Producción de Madera +10%",
      nameEn: "Wood Production +10%",
      category: "Investigaciones",
      categoryEn: "Research",
      color: "bg-energy-red"
    });
    
    // Nivel 5
    await this.createCastleUnlock({
      castleLevel: 5,
      name: "Laboratorio Nivel 3",
      nameEn: "Laboratory Level 3",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 5,
      name: "Asedio Nivel 1",
      nameEn: "Siege Workshop Level 1",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 5,
      name: "Producción de Piedra +10%",
      nameEn: "Stone Production +10%",
      category: "Investigaciones",
      categoryEn: "Research",
      color: "bg-energy-red"
    });
    
    // Nivel 6
    await this.createCastleUnlock({
      castleLevel: 6,
      name: "Torre de Arqueros Nivel 5",
      nameEn: "Archer Tower Level 5",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 6,
      name: "Herrería Nivel 5",
      nameEn: "Smithy Level 5",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 6,
      name: "Santuario de Mascotas",
      nameEn: "Pet Sanctuary",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 6,
      name: "Armadura Mejorada",
      nameEn: "Improved Armor",
      category: "Investigaciones",
      categoryEn: "Research",
      color: "bg-energy-red"
    });
    
    await this.createCastleUnlock({
      castleLevel: 6,
      name: "Producción de Alimentos +15%",
      nameEn: "Food Production +15%",
      category: "Investigaciones",
      categoryEn: "Research",
      color: "bg-energy-red"
    });
    
    // Nivel 7
    await this.createCastleUnlock({
      castleLevel: 7,
      name: "Muro Nivel 7",
      nameEn: "Wall Level 7",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 7,
      name: "Cuartel Avanzado",
      nameEn: "Advanced Barracks",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 7,
      name: "Velocidad de Investigación +10%",
      nameEn: "Research Speed +10%",
      category: "Investigaciones",
      categoryEn: "Research",
      color: "bg-energy-red"
    });
    
    // Nivel 8
    await this.createCastleUnlock({
      castleLevel: 8,
      name: "Academia de Héroes Nivel 5",
      nameEn: "Hero Academy Level 5",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 8,
      name: "Producción de Hierro +15%",
      nameEn: "Iron Production +15%",
      category: "Investigaciones",
      categoryEn: "Research",
      color: "bg-energy-red"
    });
    
    await this.createCastleUnlock({
      castleLevel: 8,
      name: "Velocidad de Construcción +10%",
      nameEn: "Building Speed +10%",
      category: "Investigaciones",
      categoryEn: "Research",
      color: "bg-energy-red"
    });
    
    // Nivel 9
    await this.createCastleUnlock({
      castleLevel: 9,
      name: "Mina de Cristal",
      nameEn: "Crystal Mine",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 9,
      name: "Altar de Invocación",
      nameEn: "Summoning Altar",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    // Nivel 10
    await this.createCastleUnlock({
      castleLevel: 10,
      name: "Torre de Magia",
      nameEn: "Magic Tower",
      category: "Edificios",
      categoryEn: "Buildings",
      color: "bg-hero-blue"
    });
    
    await this.createCastleUnlock({
      castleLevel: 10,
      name: "Poder de Héroe +15%",
      nameEn: "Hero Power +15%",
      category: "Investigaciones",
      categoryEn: "Research",
      color: "bg-energy-red"
    });
    
    await this.createCastleUnlock({
      castleLevel: 10,
      name: "Velocidad de Entrenamiento +20%",
      nameEn: "Training Speed +20%",
      category: "Investigaciones",
      categoryEn: "Research",
      color: "bg-energy-red"
    });
  }
}

// Export storage instance
export const storage = new MemStorage();
