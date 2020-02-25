import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  NativeModules,
  Platform,
} from 'react-native';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect, ConnectedProps } from 'react-redux';

import { ExpensesStackParamList } from '../navigation/Stack';
import { useLocalization } from '../contexts/localization';
import { Routes } from '../navigation/routes';
import ExpenseListItem from '../components/molecules/ExpenseListItem';
import { RootState } from '../store/types';
import { getExpenseById } from '../store/expenses/selector';

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

const mapState = (state: RootState, ownProps: ExpenseProps) => ({
  expense: getExpenseById(state, ownProps.route.params.expense.id),
});

// eslint-disable-next-line prettier/prettier
const connector = connect(mapState, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ExpenseProps {
  navigation: NavigationParams;
  theme: Theme;
  route: ExpenseScreenRouteProp;
}

type Props = ExpenseProps & PropsFromRedux;

function Expense({ navigation, theme, expense }: Props) {
  const { colors } = theme;
  const { RTL, translations } = useLocalization();

  if (expense === undefined) {
    console.log('[ERROR]: Undefined `Expense` model.');
    return null;
  }

  console.log(expense);

  const handleAddComment = () => {
    navigation.navigate(Routes.ExpenseAddComment, {
      screen: Routes.ExpenseAddComment,
      params: { expense: expense },
    });
  };

  const handleAddReceipt = () => {
    if (Platform.OS === 'ios') {
      NativeModules.NavigationBridge.changeToNativeView();
    }
    console.log('handleAddReceipt');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <Divider inset={true} />
      <ExpenseListItem expense={expense} />
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
        onPress={() => handleAddComment()}
      />
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={[
            styles.surface,
            {
              borderColor: colors.disabled,
              backgroundColor: colors.disabled,
            },
          ]}
          onPress={() => handleAddReceipt()}>
          <Avatar.Icon
            size={64}
            icon={() => <Icon name={'plus'} size={24} color={colors.surface} />}
            color={colors.surface}
          />
          <Text style={styles.addReceiptLabel}>
            {translations['expense.addReceipt.action']}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default withTheme(connector(Expense));
