import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationCAT from './locales/cat/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      cat: {
        translation: translationCAT, 
      },
      en: {
        translation: translationEN, 
      },
      es: {
        translation: translationES,
      },
    },
    lng: 'cat',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
