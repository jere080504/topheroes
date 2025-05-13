import { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/lib/i18n";

export function Navigation() {
  const [location, setLocation] = useLocation();
  const { language } = useLanguage();
  
  // Determine active section based on path
  const getActivePath = () => {
    if (location === "/pets") return "pets";
    if (location === "/castle") return "castle";
    return "heroes"; // Default to heroes (handles "/" and any other path)
  };
  
  const activePath = getActivePath();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto py-2 space-x-1 md:space-x-8 md:justify-center">
          <button 
            onClick={() => setLocation("/")}
            className={`section-tab whitespace-nowrap px-4 py-3 font-ui font-medium text-gray-700 hover:text-hero-blue ${
              activePath === "heroes" ? "active border-b-3 border-hero-blue text-hero-blue" : ""
            }`}
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
              {translate('heroes', language)}
            </span>
          </button>
          
          <button 
            onClick={() => setLocation("/pets")}
            className={`section-tab whitespace-nowrap px-4 py-3 font-ui font-medium text-gray-700 hover:text-hero-blue ${
              activePath === "pets" ? "active border-b-3 border-hero-blue text-hero-blue" : ""
            }`}
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 5.172C10 3.782 8.423 2 6.5 2S3 3.782 3 5.172c0 .766.363 1.359.7 1.91.337.551.7 1.193.7 2.196 0 1.233-1.2 3.182-1.2 3.182s2.8-1.626 4.5-1.626 4.5 1.626 4.5 1.626-1.2-1.949-1.2-3.182c0-1.003.363-1.645.7-2.196.337-.551.7-1.144.7-1.91z"></path>
                <path d="M21 5.172C21 3.782 19.423 2 17.5 2S14 3.782 14 5.172c0 .766.363 1.359.7 1.91.337.551.7 1.193.7 2.196 0 1.233-1.2 3.182-1.2 3.182s2.8-1.626 4.5-1.626 4.5 1.626 4.5 1.626-1.2-1.949-1.2-3.182c0-1.003.363-1.645.7-2.196.337-.551.7-1.144.7-1.91z"></path>
                <path d="M16 22c-1 0-3-2-3-2s-2 2-3 2-3-1.5-3-3c0-1.5 3-5 3-5v-3h6v3s3 3.5 3 5c0 1.5-2 3-3 3z"></path>
              </svg>
              {translate('pets', language)}
            </span>
          </button>
          
          <button 
            onClick={() => setLocation("/castle")}
            className={`section-tab whitespace-nowrap px-4 py-3 font-ui font-medium text-gray-700 hover:text-hero-blue ${
              activePath === "castle" ? "active border-b-3 border-hero-blue text-hero-blue" : ""
            }`}
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 22h22M3 22V10l9-7 9 7v12M9 8v2M15 8v2M5 22v-5H3v3M9 22v-3h6v3M19 22v-5h2v3M9 14h6M9 18h6"></path>
              </svg>
              {translate('castle', language)}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
