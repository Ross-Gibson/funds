import React, { ReactNode } from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider as ThemeProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkModeProvider, useDynamicValue } from 'react-native-dark-mode';

import NavigationStack from './navigation/Stack';
import { AppTheme } from './theme';
import configureStore from './store/utils/configureStore';

// optimize the memory usage for screens: https://reactnavigation.org/docs/en/next/native-stack-navigator.html
enableScreens();

function App() {
  const { store } = configureStore();
  const theme = useDynamicValue(AppTheme);

  function storeContainer(children: ReactNode | ReactNode[]) {
    return <StoreProvider store={store}>{children}</StoreProvider>;
  }

  function themeContainer(children: ReactNode | ReactNode[]) {
    return (
      <DarkModeProvider>
        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </DarkModeProvider>
    );
  }
  return storeContainer(
    themeContainer(
      <SafeAreaProvider>
        <NavigationStack />
      </SafeAreaProvider>,
    ),
  );
}

export default App;
