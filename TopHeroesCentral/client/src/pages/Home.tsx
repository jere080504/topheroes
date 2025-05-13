import { useLocation } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import HeroesSection from "@/components/heroes/HeroesSection";
import PetsSection from "@/components/pets/PetsSection";
import CastleSection from "@/components/castle/CastleSection";
import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/lib/i18n";
import { GAME_INFO } from "@/lib/gameData";

export default function Home() {
  const [location] = useLocation();
  const { language } = useLanguage();
  
  // Determine which section to show based on the current path
  const getActiveSection = () => {
    if (location === "/pets") return "pets";
    if (location === "/castle") return "castle";
    return "heroes"; // Default to heroes (handles "/" and other paths)
  };
  
  const activeSection = getActiveSection();

  return (
    <div className="min-h-screen pb-10" style={{
      background: "linear-gradient(rgba(245, 247, 255, 0.9), rgba(245, 247, 255, 0.9)), url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
    }}>
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-amber-700 glow-text-amber">{translate('appTitle', language)}</h2>
          <p className="text-amber-700 text-center mb-2">{translate('nonOfficialGuide', language)}</p>
          <p className="text-gray-700 text-lg text-center">{GAME_INFO.DESCRIPTION}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800 p-4 rounded-lg shadow text-white hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">{translate('heroes', language)}</h3>
              <p className="text-gray-300">{GAME_INFO.HERO_FOOD_INFO}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow text-white hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold mb-2 text-green-400">{translate('pets', language)}</h3>
              <p className="text-gray-300">{GAME_INFO.PET_FOOD_INFO}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow text-white hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold mb-2 text-amber-400">{translate('castle', language)}</h3>
              <p className="text-gray-300">{GAME_INFO.CASTLE_FEATURES[0]}</p>
            </div>
          </div>
        </div>
        
        {activeSection === "heroes" && <HeroesSection />}
        {activeSection === "pets" && <PetsSection />}
        {activeSection === "castle" && <CastleSection />}
      </main>
      
      <Footer />
    </div>
  );
}
