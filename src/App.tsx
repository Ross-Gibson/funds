import React, { ReactNode } from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider as ThemeProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkModeProvider, useDynamicValue } from 'react-native-dark-mode';

import NavigationStack from './navigation/Stack';
import { AppTheme } from './theme';

// optimize the memory usage for screens: https://reactnavigation.org/docs/en/next/native-stack-navigator.html
enableScreens();

function App() {
  const theme = useDynamicValue(AppTheme);
  function themeContainer(children: ReactNode | ReactNode[]) {
    return (
      <DarkModeProvider>
        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </DarkModeProvider>
    );
  }
  return themeContainer(
    <SafeAreaProvider>
      <NavigationStack />
    </SafeAreaProvider>,
  );
}

export default App;
