import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/lib/i18n";

export function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="bg-gray-900/95 text-white py-4 px-6 md:px-10 shadow-lg backdrop-blur-sm border-b border-amber-900/30">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center mr-3 shadow-lg transform hover:scale-105 transition-transform">
            <span className="text-gray-900 font-heading font-bold text-xl">TH</span>
          </div>
          <h1 className="font-heading text-2xl text-amber-300">{translate('appTitle', language)}</h1>
        </div>
        
        {/* Language Toggle */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setLanguage('es')}
            className={`lang-selector ${
              language === 'es' 
                ? 'bg-amber-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            🇪🇸 Español
          </button>
          <button 
            onClick={() => setLanguage('en')}
            className={`lang-selector ${
              language === 'en' 
                ? 'bg-amber-600' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            🇬🇧 English
          </button>
        </div>
      </div>
    </header>
  );
}
