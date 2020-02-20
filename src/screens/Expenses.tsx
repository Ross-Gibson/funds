import React, { useEffect } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, View } from 'react-native';
import { NavigationParams } from 'react-navigation';
import { Theme, withTheme, Text } from 'react-native-paper';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../store/types';
import { fetchExpenses as fetchExpensesAction } from '../store/expenses/actions';

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
  useEffect(() => {
    fetchExpenses({ limit: 25, offset: 0 });
  }, []);

  useEffect(() => {
    // TODO: Prevent double render
    console.log('Expenses updated:', expenses);
  }, [expenses]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView>
      <FlatList
        data={expenses}
        extraData={expenses}
        renderItem={({ item }) => (
          <View>
            <Text>{item.date}</Text>
            <Text>{item.merchant}</Text>
            <Text>{item.amount.value}</Text>
            <Text>{item.user.email}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default withTheme(connector(Expenses));
