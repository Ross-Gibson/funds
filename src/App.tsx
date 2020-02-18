/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

function App() {
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
        renderItem={({ item }) => <Text>{item.user.email}</Text>}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default App;
