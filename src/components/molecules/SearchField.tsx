import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Theme,
  withTheme,
  Searchbar,
  SearchbarProps,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import IndicatorDot from '../atoms/IndicatorDot';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 8,
    paddingRight: 16,
  },
  searchbar: {
    flex: 1,
    elevation: 0,
    backgroundColor: 'transparent',
  },
  filterIndicator: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
});

export interface SearchFieldProps extends SearchbarProps {
  theme: Theme;
  onFilterPress: () => void;
  filterIndicator: boolean;
}

function SearchField({
  theme,
  onChangeText,
  value,
  placeholder,
  onFilterPress,
  filterIndicator,
}: SearchFieldProps) {
  const { colors } = theme;

  return (
    <View style={styles.container}>
      <View
        style={[styles.contentContainer, { backgroundColor: colors.surface }]}>
        <Searchbar
          style={styles.searchbar}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
        />
        <Icon
          name={'filter-variant'}
          size={24}
          color={colors.text}
          onPress={onFilterPress}
        />
        {filterIndicator && <IndicatorDot style={styles.filterIndicator} />}
      </View>
    </View>
  );
}

export default withTheme(SearchField);
