import { useLanguage } from "@/context/LanguageContext";
import { translate } from "@/lib/i18n";

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-night text-white py-6 px-4">
      <div className="container mx-auto text-center">
        <p className="mb-2 font-ui">{translate('appTitle', language)} - {translate('nonOfficialGuide', language)}</p>
      </div>
    </footer>
  );
}
