import React from 'react';
import { View, NativeModules, Platform } from 'react-native';
import { Theme, withTheme, List } from 'react-native-paper';

import { useLocalization } from '../contexts/localization';

interface Props {
  theme: Theme;
}

function Options({ theme }: Props) {
  const { colors } = theme;
  const { translations } = useLocalization();

  const handleShowDetail = () => {
    if (Platform.OS === 'ios') {
      NativeModules.NavigationBridge.showDetail();
    }
  };

  return (
    <View style={{ backgroundColor: colors.background }}>
      <List.Item
        title={translations['options.showNativeView.title']}
        onPress={() => handleShowDetail()}
      />
    </View>
  );
}

export default withTheme(Options);
