import { createI18n } from 'vue-i18n';
import frLocal from '../locale/fr.json';

const messages = {
  fr: frLocal,
};

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages,
});

export default i18n;
