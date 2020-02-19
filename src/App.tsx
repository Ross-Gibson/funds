import React from 'react';
import { enableScreens } from 'react-native-screens';

import NavigationStack from './navigation/Stack';

// optimize the memory usage for screens: https://reactnavigation.org/docs/en/next/native-stack-navigator.html
enableScreens();

function App() {
  return <NavigationStack />;
}

export default App;
