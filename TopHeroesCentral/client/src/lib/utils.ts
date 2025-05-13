import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

// Generate stars for display based on count
export function generateStars(count: number): string {
  return "★".repeat(count);
}

// Get CSS color class based on rarity
export function getRarityColorClass(rarity: string): string {
  switch (rarity) {
    case "Legendario":
    case "Legendary":
      return "text-gold";
    case "Épico":
    case "Epic":
      return "text-purple-500";
    case "Raro":
    case "Rare":
      return "text-blue-500";
    default:
      return "text-gray-400";
  }
}

// Get badge color class based on type
export function getTypeColorClass(type: string): string {
  switch (type) {
    case "Ataque":
    case "Attack":
      return "bg-energy-red text-white";
    case "Defensa":
    case "Defense":
      return "bg-green-600 text-white";
    case "Soporte":
    case "Support":
      return "bg-hero-blue text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

// Get badge for rarity
export function getRarityBadgeClass(rarity: string): string {
  switch (rarity) {
    case "Legendario":
    case "Legendary":
      return "bg-gold text-night";
    case "Épico":
    case "Epic":
      return "bg-purple-500 text-white";
    case "Raro":
    case "Rare":
      return "bg-blue-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}
