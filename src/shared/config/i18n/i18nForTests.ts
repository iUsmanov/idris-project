// #i18next
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	// fallbackLng: false,
	// fallbackLng: localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY),
	fallbackLng: 'ru',
	lng: 'ru',

	debug: false,

	interpolation: {
		escapeValue: false, // not needed for react!!
	},

	resources: { ru: { translations: {} } },
});

export default i18n;
