import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  InputAccessoryView,
  View,
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import {
  Theme,
  withTheme,
  Caption,
  TextInput,
  Button,
} from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/core';
import { NavigationParams } from 'react-navigation';

import { useLocalization } from '../contexts/localization';
import { ExpenseAddCommentStackParamList } from '../navigation/Stack';
import { RootState } from '../store/types';
import { addComment as addCommentAction } from '../store/expenses/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  accessoryView: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    marginBottom: 0,
  },
  caption: {
    textAlign: 'center',
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  button: {
    flex: 1,
    marginBottom: 16,
  },
});

type ExpenseAddCommentScreenRouteProp = RouteProp<
  ExpenseAddCommentStackParamList,
  'ExpenseAddComment'
>;

const mapState = (state: RootState) => ({
  savingComment: state.expenses.savingComment,
});

const mapDispatch = {
  addComment: addCommentAction,
};

// eslint-disable-next-line prettier/prettier
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  navigation: NavigationParams;
  theme: Theme;
  route: ExpenseAddCommentScreenRouteProp;
};

function ExpenseAddComment({
  navigation,
  theme,
  route,
  addComment,
  savingComment,
}: Props) {
  const textInputRef = useRef(null);
  const { expense } = route.params;
  const [comment, setComment] = useState(expense.comment);
  const { colors } = theme;
  const { translations } = useLocalization();

  useEffect(() => {
    if (textInputRef !== null) {
      textInputRef.current.focus();

      return () => {
        textInputRef.current.blur();
      };
    }
  }, []);

  const handleSave = () => {
    addComment({ comment: comment, expenseId: expense.id });
    // TODO: We could create a navigation saga to handle this action
    // instead of dispatching from the screen directly.
    navigation.dispatch(CommonActions.goBack());
  };

  const inputAccessoryViewID = '@funds:expenseAddComment.inputAccessoryViewID';

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        keyboardDismissMode="interactive"
        contentInset={{ top: 0, left: 0, bottom: 128, right: 0 }}>
        <Caption style={styles.caption}>
          {translations['expenseAddComment.description']}
        </Caption>
        <TextInput
          style={styles.textInput}
          ref={textInputRef}
          label={translations['expenseAddComment.textField.title']}
          placeholder={
            expense.comment === '' ? translations[''] : expense.comment
          }
          value={comment}
          onChangeText={text => setComment(text)}
          multiline={true}
          inputAccessoryViewID={inputAccessoryViewID}
        />
      </ScrollView>
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View style={styles.accessoryView}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => (savingComment ? null : handleSave())}
            disabled={savingComment || comment.length < 1}
            loading={savingComment}>
            {translations['expenseAddComment.saveButton.title']}
          </Button>
        </View>
      </InputAccessoryView>
    </KeyboardAvoidingView>
  );
}

export default withTheme(connector(ExpenseAddComment));
