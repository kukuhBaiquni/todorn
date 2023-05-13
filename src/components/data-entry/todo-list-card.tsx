import React, { Fragment, useContext, memo } from 'react'
import { View, Text, StyleSheet, Dimensions, Pressable, ActivityIndicator } from 'react-native'
import colors from '../../constants/colors'
import commonFormat from '../../helpers/date-format'
import { TodoListItem } from '../../types/todo'
import { useDeleteTodoListMutation, useUpdateStatusTodoListMutation } from '../../services/todo'
import { useIsFocused } from '@react-navigation/native'
import showAlert from '../../helpers/show-alert'
import TodoTabViewContext from '../../context/todo-tab-view-context'

const { width } = Dimensions.get('screen')

export default memo(function TodoListCard(props: TodoListItem & { todoId: string }) {
  const { name, isDone, createdAt, todoId, _id } = props
  const ctx = useContext(TodoTabViewContext)
  const isFocused = useIsFocused()
  const styles = getStyles(isDone)

  const [updateStatusTodoList, updateSTatusTodoListMutation] = useUpdateStatusTodoListMutation()
  const [deleteTodoList, deleteTodoListMutation] = useDeleteTodoListMutation()

  const onPressDelete = () => {
    showAlert({
      title: 'Delete Todo List',
      desc: 'Are you sure want to delete this todo list?',
      func: async () => {
        await deleteTodoList({ todoId, todoListId: _id })
      },
    })
  }

  const onPressRadio = async () => {
    await updateStatusTodoList({ todoId, todoListId: _id, isDone: !isDone })
  }

  return (
    <View style={styles.todoListCard}>
      {isFocused && (
        <Fragment>
          <View style={styles.todoListOverview}>
            <Pressable onPress={() => ctx?.onOpenModal(_id, 'updateTodoList')}>
              <Text style={styles.todoListNameText}>
                {name} <Text style={styles.editText}>EDIT</Text>
              </Text>
            </Pressable>
            <Text style={styles.dateText}>{commonFormat(new Date(createdAt))}</Text>
            <Text style={styles.statusText}>{isDone ? 'Done' : 'Pending'}</Text>
          </View>
          <View style={styles.actionWrapper}>
            {updateSTatusTodoListMutation.isLoading || deleteTodoListMutation.isLoading ? (
              <ActivityIndicator color={colors.BLUE} size="large" />
            ) : (
              <Fragment>
                <Pressable onPress={onPressRadio}>
                  <View style={styles.radioWrapper}>
                    <View style={styles.radio}></View>
                  </View>
                </Pressable>
                <Pressable onPress={onPressDelete}>
                  <Text style={styles.deleteText}>DELETE</Text>
                </Pressable>
              </Fragment>
            )}
          </View>
        </Fragment>
      )}
    </View>
  )
})

function getStyles(isDone: boolean) {
  return StyleSheet.create({
    todoListCard: {
      height: 80,
      elevation: 2,
      width: width - 25,
      backgroundColor: colors.SEMI_WHITE,
      paddingHorizontal: 8,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    todoListOverview: {
      width: width * 0.75,
    },
    todoListNameText: {
      color: colors.BLACK,
      fontSize: 20,
    },
    editText: {
      color: colors.BLUE,
      fontSize: 16,
    },
    dateText: {
      color: colors.GRAY,
      fontSize: 16,
    },
    statusText: {
      color: isDone ? colors.GREEN : colors.ORANGE,
      fontSize: 16,
    },
    actionWrapper: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: width * 0.25,
    },
    deleteText: {
      color: colors.RED,
      marginTop: 10,
    },
    radioWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    radio: {
      height: 20,
      width: 20,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: isDone ? colors.GREEN : colors.GRAY,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDone ? colors.GREEN : 'transparent',
    },
    radioText: {
      color: colors.WHITE,
    },
  })
}
