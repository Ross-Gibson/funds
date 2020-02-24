import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import {
  Theme,
  withTheme,
  Caption,
  TextInput,
  Button,
} from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';

import { useLocalization } from '../contexts/localization';
import { ExpenseAddCommentStackParamList } from '../navigation/Stack';
import { RootState } from '../store/types';
import { addComment as addCommentAction } from '../store/expenses/actions';

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
  theme: Theme;
  route: ExpenseAddCommentScreenRouteProp;
};

function ExpenseAddComment({ theme, route, addComment, savingComment }: Props) {
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

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <Caption style={styles.caption}>{'TODO'}</Caption>
        <TextInput
          ref={textInputRef}
          type="flat"
          label={'TODO'}
          placeholder={
            expense.comment === '' ? 'TODO Placeholder' : expense.comment
          }
          value={comment}
          onChangeText={text => setComment(text)}
          multiline={true}
        />
      </ScrollView>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() =>
          savingComment
            ? null
            : addComment({ comment: comment, expenseId: expense.id })
        }
        disabled={savingComment || comment.length < 1}
        loading={savingComment}>
        {'TODO'}
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  caption: {
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 44,
  },
  button: {
    marginBottom: 100,
    marginHorizontal: 20,
  },
});

export default withTheme(connector(ExpenseAddComment));
