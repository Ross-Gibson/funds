import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Theme, withTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
});

interface Props {
  theme: Theme;
  style?: ViewStyle;
}

function IndicatorDot({ theme, style }: Props) {
  const { colors } = theme;

  return (
    <View
      style={[
        styles.indicator,
        { backgroundColor: colors.accent, borderColor: colors.surface },
        style,
      ]}
    />
  );
}

export default withTheme(IndicatorDot);
