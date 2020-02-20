import React from 'react';
import { View } from 'react-native';
import { NavigationParams } from 'react-navigation';
import { Theme, withTheme } from 'react-native-paper';

interface Props {
  navigation: NavigationParams;
  theme: Theme;
}

function Expense({ navigation, theme }: Props) {
  const { colors } = theme;
  return <View style={{ backgroundColor: colors.background }} />;
}

export default withTheme(Expense);
