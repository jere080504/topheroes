import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Hero schema
export const heroes = pgTable("heroes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  faction: text("faction").notNull(), // Caballeros, Hechiceros, Elfos, Orcos
  factionEn: text("faction_en").notNull(), // Knights, Wizards, Elves, Orcs
  rarity: text("rarity").notNull(), // Común, Raro, Épico, Legendario
  rarityEn: text("rarity_en").notNull(), // Common, Rare, Epic, Legendary
  stars: integer("stars").notNull(), // 1-5
  image: text("image").notNull(),
  backgroundClass: text("background_class").notNull(), // CSS class for gradient background
});

// Hero Food Requirements
export const heroFoodRequirements = pgTable("hero_food_requirements", {
  id: serial("id").primaryKey(),
  level: integer("level").notNull(),
  food: integer("food").notNull(),
});

// Pet schema
export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  type: text("type").notNull(), // Ataque, Defensa, Soporte
  typeEn: text("type_en").notNull(), // Attack, Defense, Support
  rarity: text("rarity").notNull(), // Común, Raro, Épico, Legendario
  rarityEn: text("rarity_en").notNull(), // Common, Rare, Epic, Legendary
  stars: integer("stars").notNull(), // 1-5
  image: text("image").notNull(),
  backgroundClass: text("background_class").notNull(), // CSS class for gradient background
});

// Pet Food Requirements
export const petFoodRequirements = pgTable("pet_food_requirements", {
  id: serial("id").primaryKey(),
  level: integer("level").notNull(),
  food: integer("food").notNull(),
});

// Castle schema
export const castleLevels = pgTable("castle_levels", {
  id: serial("id").primaryKey(),
  level: integer("level").notNull(),
  stone: integer("stone").notNull(),
  wood: integer("wood").notNull(),
  ruby: integer("ruby").notNull(),
  buildTime: text("build_time").notNull(),
  requiredLevel: integer("required_level").notNull(),
});

// Castle Unlocks
export const castleUnlocks = pgTable("castle_unlocks", {
  id: serial("id").primaryKey(),
  castleLevel: integer("castle_level").notNull(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  category: text("category").notNull(), // Buildings, Research
  categoryEn: text("category_en").notNull(), // Buildings, Research
  color: text("color").notNull(), // CSS color class
});

// Insert schemas
export const insertHeroSchema = createInsertSchema(heroes).omit({ id: true });
export const insertHeroFoodRequirementSchema = createInsertSchema(heroFoodRequirements).omit({ id: true });
export const insertPetSchema = createInsertSchema(pets).omit({ id: true });
export const insertPetFoodRequirementSchema = createInsertSchema(petFoodRequirements).omit({ id: true });
export const insertCastleLevelSchema = createInsertSchema(castleLevels).omit({ id: true });
export const insertCastleUnlockSchema = createInsertSchema(castleUnlocks).omit({ id: true });

// Types
export type Hero = typeof heroes.$inferSelect;
export type InsertHero = z.infer<typeof insertHeroSchema>;

export type HeroFoodRequirement = typeof heroFoodRequirements.$inferSelect;
export type InsertHeroFoodRequirement = z.infer<typeof insertHeroFoodRequirementSchema>;

export type Pet = typeof pets.$inferSelect;
export type InsertPet = z.infer<typeof insertPetSchema>;

export type PetFoodRequirement = typeof petFoodRequirements.$inferSelect;
export type InsertPetFoodRequirement = z.infer<typeof insertPetFoodRequirementSchema>;

export type CastleLevel = typeof castleLevels.$inferSelect;
export type InsertCastleLevel = z.infer<typeof insertCastleLevelSchema>;

export type CastleUnlock = typeof castleUnlocks.$inferSelect;
export type InsertCastleUnlock = z.infer<typeof insertCastleUnlockSchema>;
