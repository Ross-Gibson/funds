import React, { useEffect, useState } from 'react';
import { SectionList, ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationParams } from 'react-navigation';
import { Theme, withTheme, List, Caption, Switch } from 'react-native-paper';
import { connect, ConnectedProps } from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootState } from '../store/types';
import { fetchExpenses as fetchExpensesAction } from '../store/expenses/actions';
import { Routes } from '../navigation/routes';
import SearchHeader from '../components/organisms/SearchHeader';
import ExpenseListItem from '../components/molecules/ExpenseListItem';
import { useLocalization } from '../contexts/localization';
import { Expense } from '../store/expenses/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchResultsEmpty: {
    textAlign: 'center',
    paddingVertical: 48,
    paddingHorizontal: 48,
    fontSize: 18,
  },
  sectionHeader: {
    paddingTop: 16,
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
    // TODO: Can this be improved? This seems prone to error.
    // Especially if a new property is added to the Expense type
    // We could maybe look at using Lodash, and deep flatten the
    // object values.
    let queryResults = expenses.filter(expense => {
      let expenseData = `
        ${expense.amount.value.toLowerCase()} 
        ${expense.amount.currency.toLowerCase()} 
        ${moment(expense.date)
          .format('D MMM YYYY')
          .toLowerCase()} 
        ${expense.merchant.toLowerCase()} 
        ${expense.comment.toLowerCase()} 
        ${expense.user.first.toLowerCase()} 
        ${expense.user.last.toLowerCase()} 
        ${expense.user.email.toLowerCase()}
      `;

      return expenseData.indexOf(searchQuery.toLowerCase()) > -1;
    });

    if (missingReceipts) {
      queryResults = queryResults.filter(expense => {
        return expense.receipts.length === 0;
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
    // TODO: Can this be improved? This seems quite expensive.
    // We could maybe look at using Lodash?
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
        <SearchHeader
          placeholder={translations['expenses.searchBar.placeholder']}
          onChangeText={query => {
            setSearchQuery(query);
          }}
          searchQuery={searchQuery}
          filterIndicator={missingReceipts}
          onFilterPress={() => handleFilterPress()}
          expanded={expanded}
          ExpandedComponent={
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
          }
        />
      }
      ListEmptyComponent={
        <Caption style={styles.searchResultsEmpty}>
          {translations['expenses.searchResults.empty.caption']}
        </Caption>
      }
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={[
            styles.sectionHeader,
            { backgroundColor: colors.background },
          ]}>
          <List.Subheader>{title}</List.Subheader>
        </View>
      )}
      renderItem={({ item }) => (
        <ExpenseListItem
          expense={item}
          onPress={() => navigation.navigate(Routes.Expense, { expense: item })}
        />
      )}
      keyExtractor={(item, index) => item.id + index}
    />
  );
}

export default withTheme(connector(Expenses));
