import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import { NavigationParams } from 'react-navigation';

interface Props {
  navigation: NavigationParams;
}

function Expenses({ navigation }: Props) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch(
          'http://localhost:3000/expenses?limit=25&offset=0',
        );
        const responseJson = await response.json();
        setExpenses(responseJson.expenses);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchExpenses();
  }, []);

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView>
      <FlatList
        data={expenses}
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

export default Expenses;
