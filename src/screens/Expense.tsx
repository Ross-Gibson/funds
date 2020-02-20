import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
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

const goldenRatio = 1.62;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  listItem: {
    marginVertical: 0,
    height: 80,
    paddingHorizontal: 16,
  },
  surface: {
    flex: 1,
    padding: 16,
    width: '100%',
    height: (Dimensions.get('window').width - 2 * 16) / goldenRatio,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    borderRadius: 8,
    borderWidth: 1,
  },
  addReceiptLabel: {
    paddingVertical: 8,
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
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.surface,
            {
              borderColor: colors.disabled,
              backgroundColor: colors.disabled,
            },
          ]}>
          <Avatar.Icon
            size={64}
            icon={() => <Icon name={'plus'} size={24} color={colors.surface} />}
            color={colors.surface}
          />
          <Text style={styles.addReceiptLabel}>Add receipt</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default withTheme(Expense);
