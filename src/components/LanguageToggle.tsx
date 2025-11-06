'use client';

import { useLanguage } from './LanguageProvider';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')}
      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
      aria-label="Toggle language"
    >
      {language === 'en' ? 'नेपाली' : 'English'}
    </button>
  );
}
