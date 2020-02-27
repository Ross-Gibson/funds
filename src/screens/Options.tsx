import React from 'react';
import { View, NativeModules, Platform } from 'react-native';
import { NavigationParams } from 'react-navigation';
import { Theme, withTheme, List } from 'react-native-paper';

interface Props {
  navigation: NavigationParams;
  theme: Theme;
}

function Options({ navigation, theme }: Props) {
  const { colors } = theme;

  const handleShowDetail = () => {
    if (Platform.OS === 'ios') {
      NativeModules.NavigationBridge.showDetail();
    }
  };

  return (
    <View style={{ backgroundColor: colors.background }}>
      <List.Item title="Show detail" onPress={() => handleShowDetail()} />
    </View>
  );
}

export default withTheme(Options);
