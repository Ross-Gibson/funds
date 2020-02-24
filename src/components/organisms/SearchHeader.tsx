import React, { ReactNode } from 'react';
import { withTheme } from 'react-native-paper';

import SearchField, { SearchFieldProps } from '../molecules/SearchField';

interface Props extends SearchFieldProps {
  expanded: boolean;
  searchQuery: string;
  ExpandedComponent?: ReactNode;
}

function SearchHeader({
  expanded,
  placeholder,
  onChangeText,
  searchQuery,
  filterIndicator,
  onFilterPress,
  ExpandedComponent,
}: Props) {
  return (
    <>
      <SearchField
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={searchQuery}
        onFilterPress={onFilterPress}
        filterIndicator={filterIndicator}
      />
      {expanded && ExpandedComponent}
    </>
  );
}

export default withTheme(SearchHeader);
