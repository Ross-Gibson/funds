import React from 'react';
import { View } from 'react-native';
import { NavigationParams } from 'react-navigation';

interface Props {
  navigation: NavigationParams;
}

function Options({ navigation }: Props) {
  return <View style={{ backgroundColor: 'white' }} />;
}

export default Options;
