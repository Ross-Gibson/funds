import React from 'react';
import { StyleSheet } from 'react-native';
import {
  withTheme,
  List,
  Avatar,
  Divider,
  Text,
  Theme,
} from 'react-native-paper';
import moment from 'moment';

import IndicatorDot from '../atoms/IndicatorDot';
import { Expense } from '../../store/expenses/types'; // TODO: Components should not know about the store

const styles = StyleSheet.create({
  container: {},
  indicator: {
    position: 'absolute',
    left: -16,
  },
  amount: {
    position: 'absolute',
    right: 0,
    width: 200, // TODO: Make this dynamic and avoid the potential overlap with the merchant title
    textAlign: 'right',
  },
  listItem: {
    marginVertical: 0,
    height: 80,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});

interface ExpenseListItemProps {
  theme: Theme;
  expense: Expense;
  onPress?: () => void;
  showIndicator?: boolean;
}

function ExpenseListItem({
  expense,
  onPress,
  showIndicator = false,
}: ExpenseListItemProps) {
  const amount = `${expense.amount.value} ${expense.amount.currency}`;
  return (
    <>
      <List.Item
        style={styles.listItem}
        title={expense.merchant}
        description={moment(expense.date).format('hh:mm')}
        right={props => (
          <List.Icon
            {...props}
            icon={() => <Text style={styles.amount}>{amount}</Text>}
          />
        )}
        left={props => (
          <List.Icon
            {...props}
            icon={() => (
              <>
                {expense.receipts.length === 0 && showIndicator && (
                  <IndicatorDot style={styles.indicator} />
                )}
                <Avatar.Image
                  {...props}
                  size={48}
                  source={{
                    uri: 'https://i.pravatar.cc/48?u=' + expense.user.email,
                  }}
                />
              </>
            )}
          />
        )}
        onPress={onPress}
      />
      <Divider inset={true} />
    </>
  );
}

export default withTheme(ExpenseListItem);
