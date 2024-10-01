import en from './en.json' assert { type: 'json' }
import bg from './bg.json' assert { type: 'json' }

export default {
  language: 'en', // default language
  availableLanguages: ['en', 'bg'], // array of available languages
  translations: {
    en,
    bg,
  },
}
