import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const router = express.Router();

  // Heroes endpoints
  // Hero food calculation endpoint - debe ir antes de /heroes/:id 
  router.get("/heroes/food-calculation", async (req, res) => {
    const startLevel = parseInt(req.query.startLevel as string);
    const endLevel = parseInt(req.query.endLevel as string);
    
    if (isNaN(startLevel) || isNaN(endLevel) || startLevel < 1 || endLevel > 230 || startLevel >= endLevel) {
      return res.status(400).json({ message: "Invalid level range" });
    }
    
    const food = await storage.calculateHeroFood(startLevel, endLevel);
    res.json({ startLevel, endLevel, food });
  });
  
  // Endpoint general para obtener todos los héroes
  router.get("/heroes", async (req, res) => {
    const heroes = await storage.getHeroes();
    res.json(heroes);
  });
  
  // Endpoint para obtener un héroe específico por ID
  router.get("/heroes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid hero ID" });
    }
    
    const hero = await storage.getHero(id);
    
    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }
    
    res.json(hero);
  });

  // Pets endpoints
  // Pet food calculation endpoint - debe ir antes de /pets/:id
  router.get("/pets/food-calculation", async (req, res) => {
    const startLevel = parseInt(req.query.startLevel as string);
    const endLevel = parseInt(req.query.endLevel as string);
    
    if (isNaN(startLevel) || isNaN(endLevel) || startLevel < 1 || endLevel > 60 || startLevel >= endLevel) {
      return res.status(400).json({ message: "Invalid level range" });
    }
    
    const food = await storage.calculatePetFood(startLevel, endLevel);
    res.json({ startLevel, endLevel, food });
  });
  
  // Endpoint general para obtener todas las mascotas
  router.get("/pets", async (req, res) => {
    const pets = await storage.getPets();
    res.json(pets);
  });
  
  // Endpoint para obtener una mascota específica por ID
  router.get("/pets/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid pet ID" });
    }
    
    const pet = await storage.getPet(id);
    
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    
    res.json(pet);
  });

  // Castle levels endpoints
  router.get("/castle-levels", async (req, res) => {
    const levels = await storage.getCastleLevels();
    res.json(levels);
  });

  router.get("/castle-levels/:level", async (req, res) => {
    const level = parseInt(req.params.level);
    
    if (isNaN(level) || level < 1 || level > 15) {
      return res.status(400).json({ message: "Invalid castle level" });
    }
    
    const castleLevel = await storage.getCastleLevel(level);
    
    if (!castleLevel) {
      return res.status(404).json({ message: "Castle level not found" });
    }
    
    res.json(castleLevel);
  });

  // Castle unlocks endpoints
  router.get("/castle-unlocks", async (req, res) => {
    const levelParam = req.query.level;
    
    if (levelParam) {
      const level = parseInt(levelParam as string);
      
      if (isNaN(level) || level < 1 || level > 15) {
        return res.status(400).json({ message: "Invalid castle level" });
      }
      
      const unlocks = await storage.getCastleUnlocksByLevel(level);
      return res.json(unlocks);
    }
    
    const unlocks = await storage.getCastleUnlocks();
    res.json(unlocks);
  });

  // Register the router with a prefix
  app.use("/api", router);

  const httpServer = createServer(app);
  return httpServer;
}
