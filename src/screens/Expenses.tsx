import React, { useEffect, useState } from 'react';
import { SectionList, ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationParams } from 'react-navigation';
import {
  Theme,
  withTheme,
  Text,
  List,
  Avatar,
  Divider,
  Switch,
  Caption,
} from 'react-native-paper';
import { connect, ConnectedProps } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootState } from '../store/types';
import { fetchExpenses as fetchExpensesAction } from '../store/expenses/actions';
import { Routes } from '../navigation/routes';
import SearchField from '../components/molecules/SearchField';
import { useLocalization } from '../contexts/localization';
import IndicatorDot from '../components/atoms/IndicatorDot';
import { Expense } from '../store/expenses/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    marginVertical: 0,
    height: 80,
    paddingHorizontal: 16,
  },
  searchResultsEmpty: {
    textAlign: 'center',
    paddingVertical: 48,
    paddingHorizontal: 48,
    fontSize: 18,
  },
  missingReceiptIndicator: {
    position: 'absolute',
    left: 4,
    alignSelf: 'center',
  },
});

const mapState = (state: RootState) => ({
  loading: state.expenses.loading,
  expenses: state.expenses.expenses,
});

const mapDispatch = {
  fetchExpenses: fetchExpensesAction,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  navigation: NavigationParams;
  theme: Theme;
};

function Expenses({
  navigation,
  theme,
  loading,
  expenses,
  fetchExpenses,
}: Props) {
  const { colors } = theme;
  const [data, setData] = useState(mapToSections(expenses));
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [missingReceipts, setMissingReceipts] = useState(false);
  const { translations } = useLocalization();

  useEffect(() => {
    fetchExpenses({ limit: 25, offset: 0 });
  }, []);

  useEffect(() => {
    // TODO: Prevent double render
    console.log('Expenses updated:', expenses);
  }, [expenses]);

  useEffect(() => {
    let queryResults = expenses.filter(item => {
      let itemData = `${item.merchant.toLowerCase()}   
    ${item.amount.value.toLowerCase()} ${item.amount.currency.toLowerCase()}`;

      return itemData.indexOf(searchQuery.toLowerCase()) > -1;
    });

    if (missingReceipts) {
      queryResults = queryResults.filter(item => {
        return item.receipts.length === 0;
      });
    }

    setData(mapToSections(queryResults));
  }, [searchQuery, expenses, missingReceipts]);

  if (loading) {
    return <ActivityIndicator />;
  }

  const handleFilterPress = () => {
    setExpanded(!expanded);
  };

  const handleMissingReceiptsValueChange = () => {
    setMissingReceipts(!missingReceipts);
  };

  function mapToSections(expenseData: Expense[]) {
    // TODO: Can this be improved? This seems like quite expensive.
    const uniqueDates = [
      ...new Set(
        expenseData.map(expense => moment(expense.date).format('D MMM YYYY')),
      ),
    ];

    const sections = uniqueDates.map(date => ({
      title: date,
      data: expenseData.filter(expense => {
        return moment(expense.date).format('D MMM YYYY') === date;
      }),
    }));

    return sections;
  }

  return (
    <SectionList
      style={[styles.container, { backgroundColor: colors.background }]}
      sections={data}
      extraData={data}
      ListHeaderComponent={
        <>
          <SearchField
            placeholder={translations['expenses.searchBar.placeholder']}
            onChangeText={query => {
              setSearchQuery(query);
            }}
            value={searchQuery}
            onFilterPress={() => handleFilterPress()}
            filterIndicator={missingReceipts}
          />
          {expanded ? (
            <>
              <List.Item
                title={translations['expenses.filter.missingReceipts.title']}
                left={props => (
                  <List.Icon
                    {...props}
                    icon={() => (
                      <Icon name={'receipt'} size={24} color={colors.text} />
                    )}
                  />
                )}
                right={props => (
                  <Switch
                    {...props}
                    value={missingReceipts}
                    onValueChange={() => handleMissingReceiptsValueChange()}
                  />
                )}
              />
            </>
          ) : null}
        </>
      }
      ListEmptyComponent={
        <Caption style={styles.searchResultsEmpty}>
          {translations['expenses.searchResults.empty.caption']}
        </Caption>
      }
      renderSectionHeader={({ section: { title } }) => (
        <View style={{ backgroundColor: colors.background }}>
          <List.Subheader>{title}</List.Subheader>
        </View>
      )}
      renderItem={({ item }) => (
        <View>
          {item.receipts.length === 0 && (
            <IndicatorDot style={styles.missingReceiptIndicator} />
          )}
          <List.Item
            style={styles.listItem}
            title={item.merchant}
            description={moment(item.date).format('hh:mm')}
            right={props => (
              <Text>{`${item.amount.value} ${item.amount.currency}`}</Text>
            )}
            left={props => (
              <Avatar.Image
                size={48}
                source={{ uri: 'https://i.pravatar.cc/48' }}
              />
            )}
            onPress={() =>
              navigation.navigate(Routes.Expense, { expense: item })
            }
          />
          <Divider inset={true} />
        </View>
      )}
      keyExtractor={(item, index) => item.id + index}
    />
  );
}

export default withTheme(connector(Expenses));
