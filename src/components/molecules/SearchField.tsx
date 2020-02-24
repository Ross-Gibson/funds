import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Theme,
  withTheme,
  Searchbar,
  SearchbarProps,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
});

interface Props extends SearchbarProps {
  theme: Theme;
  onFilterPress: () => void;
}

function SearchField({
  theme,
  onChangeText,
  value,
  placeholder,
  onFilterPress,
}: Props) {
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
      </View>
    </View>
  );
}

export default withTheme(SearchField);
