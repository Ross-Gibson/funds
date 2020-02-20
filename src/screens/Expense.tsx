import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { NavigationParams } from 'react-navigation';
import {
  Theme,
  withTheme,
  List,
  Text,
  Avatar,
  Divider,
} from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ExpensesStackParamList } from '../navigation/Stack';
import { useLocalization } from '../contexts/localization';

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

type ExpenseScreenRouteProp = RouteProp<ExpensesStackParamList, 'Expense'>;

interface Props {
  navigation: NavigationParams;
  theme: Theme;
  route: ExpenseScreenRouteProp;
}

function Expense({ navigation, theme, route }: Props) {
  const { colors } = theme;
  const { expense } = route.params;
  const { RTL, translations } = useLocalization();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <List.Item
        style={styles.listItem}
        title={expense.merchant}
        description={`${moment(expense.date).format('D MMM YYYY')} at ${moment(
          expense.date,
        ).format('hh:mm')}`}
        right={props => (
          <Text>{`${expense.amount.value} ${expense.amount.currency}`}</Text>
        )}
        left={props => (
          <Avatar.Image
            size={48}
            source={{ uri: 'https://i.pravatar.cc/48' }}
          />
        )}
      />
      <Divider inset={true} />
      <List.Item
        title={
          expense.comment === ''
            ? translations['expense.addComment.placeholder']
            : expense.comment
        }
        titleStyle={{
          color: expense.comment === '' ? colors.disabled : colors.text,
        }}
        left={props => (
          <List.Icon
            {...props}
            icon={() => (
              <Icon
                name={'message-reply-text'}
                size={24}
                color={expense.comment === '' ? colors.disabled : colors.text}
                style={{ transform: [{ scaleX: RTL ? -1 : 1 }] }} // Flip the icon according to the language direction
              />
            )}
          />
        )}
      />
    </ScrollView>
  );
}

export default withTheme(Expense);
