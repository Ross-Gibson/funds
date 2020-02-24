import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Theme, withTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    position: 'absolute',
    right: 16,
    top: 12,
  },
});

interface Props {
  theme: Theme;
}

function IndicatorDot({ theme }: Props) {
  const { colors } = theme;

  return (
    <View
      style={[
        styles.indicator,
        { backgroundColor: colors.accent, borderColor: colors.surface },
      ]}
    />
  );
}

export default withTheme(IndicatorDot);
