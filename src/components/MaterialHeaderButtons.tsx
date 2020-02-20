import * as React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';
import { useTheme } from '@react-navigation/native';

// TODO: Define prop types
function MaterialHeaderButton(props) {
  const { colors } = useTheme();

  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={24}
      color={colors.text}
    />
  );
}

// TODO: Define prop types
export function MaterialHeaderButtons(props) {
  const { colors } = useTheme();

  return (
    <HeaderButtons
      HeaderButtonComponent={MaterialHeaderButton}
      OverflowIcon={
        <MaterialIcons name="more-vert" size={24} color={colors.text} />
      }
      {...props}
    />
  );
}

export { Item } from 'react-navigation-header-buttons';
