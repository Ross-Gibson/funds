import React from 'react';
import { NavigationParams } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDynamicValue } from 'react-native-dark-mode';

import { navigationRef } from '../services/navigation';
import { Routes } from './routes';
import { NavigationTheme } from '../theme';
import { useLocalization } from '../contexts/localization';
import { Expense as ExpenseType } from '../store/expenses/types';
import {
  MaterialHeaderButtons,
  Item,
} from '../components/MaterialHeaderButtons';

import Expense from '../screens/Expense';
import ExpenseAddComment from '../screens/ExpenseAddComment';
import Expenses from '../screens/Expenses';
import Options from '../screens/Options';

export type ExpensesStackParamList = {
  Expense: { expense: ExpenseType };
  Expenses: undefined;
};

const ExpensesStack = createNativeStackNavigator<ExpensesStackParamList>();

function ExpensesStackScreen() {
  const { translations } = useLocalization();
  return (
    <ExpensesStack.Navigator
      screenOptions={{
        stackPresentation: 'push',
        headerLargeTitle: true,
        gestureEnabled: true,
      }}>
      <ExpensesStack.Screen
        name={Routes.Expenses}
        component={Expenses}
        options={{
          title: translations['expenses.title'],
        }}
      />
      <ExpensesStack.Screen
        name={Routes.Expense}
        component={Expense}
        options={{
          title: '',
        }}
      />
    </ExpensesStack.Navigator>
  );
}

export type ExpenseAddCommentStackParamList = {
  ExpenseAddComment: { expense: ExpenseType };
};

const ExpenseAddCommentStack = createNativeStackNavigator<
  ExpenseAddCommentStackParamList
>();

interface ExpenseAddCommentStackScreenProps {
  navigation: NavigationParams;
}

function ExpenseAddCommentScreens({
  navigation,
}: ExpenseAddCommentStackScreenProps) {
  const { translations } = useLocalization();
  return (
    <ExpenseAddCommentStack.Navigator>
      <ExpenseAddCommentStack.Screen
        name={Routes.ExpenseAddComment}
        component={ExpenseAddComment}
        options={{
          title: translations['expense.addComment.placeholder'],
          headerRight: () => (
            <MaterialHeaderButtons>
              <Item
                title={
                  translations['expense.addComment.navigationAction.dismiss']
                }
                onPress={() => navigation.dispatch(CommonActions.goBack())}
              />
            </MaterialHeaderButtons>
          ),
        }}
      />
    </ExpenseAddCommentStack.Navigator>
  );
}

export type OptionsStackParamList = {
  Options: undefined;
};

const OptionsStack = createNativeStackNavigator<OptionsStackParamList>();

interface OptionsStackScreenProps {
  navigation: NavigationParams;
}

function OptionsStackScreen({ navigation }: OptionsStackScreenProps) {
  const { translations } = useLocalization();
  return (
    <OptionsStack.Navigator
      initialRouteName={Routes.Options}
      screenOptions={{
        stackPresentation: 'push',
        headerLargeTitle: true,
        gestureEnabled: true,
      }}>
      <OptionsStack.Screen
        name={Routes.Options}
        component={Options}
        options={{
          title: translations['options.title'],
        }}
      />
    </OptionsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabScreens() {
  const { translations } = useLocalization();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === Routes.Expenses) {
            iconName = 'credit-card-multiple';
          } else if (route.name === Routes.Options) {
            iconName = 'dots-horizontal';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name={Routes.Expenses}
        component={ExpensesStackScreen}
        options={{
          title: translations['expenses.tabBar.title'],
        }}
      />
      <Tab.Screen
        name={Routes.Options}
        component={OptionsStackScreen}
        options={{
          title: translations['options.tabBar.title'],
        }}
      />
    </Tab.Navigator>
  );
}

export type RootStackParamList = {
  Main: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function NavigationStack() {
  const navigationTheme = useDynamicValue(NavigationTheme);

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <RootStack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          stackPresentation: 'modal',
        }}>
        <RootStack.Screen name="Main" component={TabScreens} />
        <RootStack.Screen
          name={Routes.ExpenseAddComment}
          component={ExpenseAddCommentScreens}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationStack;
