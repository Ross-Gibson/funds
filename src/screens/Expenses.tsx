import React, { useEffect } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationParams } from 'react-navigation';
import {
  Theme,
  withTheme,
  Text,
  List,
  Avatar,
  Divider,
} from 'react-native-paper';
import { connect, ConnectedProps } from 'react-redux';
import moment from 'moment';

import { RootState } from '../store/types';
import { fetchExpenses as fetchExpensesAction } from '../store/expenses/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    marginVertical: 0,
    height: 80,
    paddingHorizontal: 16,
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
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      data={expenses}
      extraData={expenses}
      renderItem={({ item }) => (
        <View>
          <List.Subheader>
            {moment(item.date).format('D MMM YYYY')}
          </List.Subheader>
          <List.Item
            style={styles.listItem}
            title={item.merchant}
            description={moment(item.date).format('h:mm a')}
            right={props => (
              <Text>{`${item.amount.value} ${item.amount.currency}`}</Text>
            )}
            left={props => (
              <Avatar.Image
                size={48}
                source={{ uri: 'https://i.pravatar.cc/48' }}
              />
            )}
          />
          <Divider inset={true} />
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
}

export default withTheme(connector(Expenses));
