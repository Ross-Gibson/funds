import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { I18nManager, AsyncStorage } from 'react-native';
import RNRestart from 'react-native-restart';
import * as RNLocalize from 'react-native-localize';

import { translations, languages } from './translations';

// Fallback if no available language fits.
const fallback = { languageTag: 'en', isRTL: false };

const LocalizationContext = createContext({
  translations,
  RTL: fallback.isRTL,
});

function LocalizationProvider({ children }: { children: ReactNode }) {
  const [RTL, setRTL] = useState(fallback.isRTL);

  async function setLocalizationConfig() {
    let language = await AsyncStorage.getItem('@funds:appLanguage');

    // If we don't have a stored language, use the fallback
    if (!language) {
      language = fallback.languageTag;
    }

    const { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(Object.keys(languages)) || fallback;

    I18nManager.forceRTL(isRTL);
    translations.setLanguage(languageTag);
    setRTL(isRTL);

    // Store the current language, and force a restart to update the RTL layout.
    // TODO: This seems like a bit of a hack. Maybe there is a better way?
    if (language !== languageTag) {
      AsyncStorage.setItem('@funds:appLanguage', languageTag);
      RNRestart.Restart();
    }
  }

  useEffect(() => {
    setLocalizationConfig();

    RNLocalize.addEventListener('change', setLocalizationConfig);

    return function cleanup() {
      RNLocalize.removeEventListener('change', setLocalizationConfig);
    };
  }, []);

  return (
    <LocalizationContext.Provider value={{ translations, RTL }}>
      {children}
    </LocalizationContext.Provider>
  );
}

function useLocalization() {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error(
      'useLocalization must be used within a LocalizationProvider',
    );
  }
  return context;
}

export { LocalizationProvider, useLocalization };
