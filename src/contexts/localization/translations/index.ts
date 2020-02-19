import LocalizedStrings from 'react-native-localization';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';

// TODO: Lazy load the languages
export const languages = { en, fr, es };
export const translations = new LocalizedStrings(languages);
