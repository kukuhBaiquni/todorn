import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Keyboard } from 'react-native'
import Toast from 'react-native-toast-message'

import { TodoDetailProps } from '../navigation'
import Button from '../components/common/button'
import TodoOverview from '../components/data-entry/todo-overview'
import ModalInput from '../components/form/modal-input'
import { useCreateTodoListMutation, useDeleteTodoMutation } from '../services/todo'
import { useAppSelector } from '../lib/redux'
import { TodoListItem, ResponseGetTodos } from '../types/todo'
import showAlert from '../helpers/show-alert'
import TodoTabView from '../components/data-entry/todo-tab-view'

const { width } = Dimensions.get('screen')

export default function TodoDetail({ navigation, route }: TodoDetailProps) {
  const data = route.params?.todo
  const [createTodoList, createTodoListMutation] = useCreateTodoListMutation()
  const [deleteTodo, deleteTodoMutation] = useDeleteTodoMutation()

  const todoList = useAppSelector(
    (state) => state.todoApi.queries[`getTodos({"userId":"${data.owner}"})`] ?? { data: [] },
  )

  const currentTodo = todoList?.data as ResponseGetTodos[]

  const allTodos: TodoListItem[] = useMemo(
    () => currentTodo.find((item) => item?._id === data?._id)?.todoList || [],
    [data._id, currentTodo],
  )

  const doneTodos = useMemo(() => allTodos.filter((item) => item.isDone), [allTodos])
  const pendingTodos = useMemo(() => allTodos.filter((item) => !item.isDone), [allTodos])

  const [todoName, setTodoName] = useState(data.name)
  const [textValue, setTextValue] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (createTodoListMutation.isSuccess && !createTodoListMutation.isLoading) {
      setIsModalVisible(false)
      onModalHide()
    }

    if (createTodoListMutation.isError && !createTodoListMutation.isLoading) {
      Toast.show({
        type: 'e',
        text1: 'Create Todo',
        text2: 'Failed to create todo list',
        position: 'top',
        topOffset: 10,
      })
    }
  }, [
    createTodoListMutation.isSuccess,
    createTodoListMutation.isLoading,
    createTodoListMutation.isError,
  ])

  useEffect(() => {
    if (!deleteTodoMutation.isLoading && deleteTodoMutation.isSuccess) {
      Toast.show({
        type: 's',
        text1: 'Delete Todo',
        text2: 'Todo has been deleted!',
        position: 'top',
        topOffset: 10,
      })
      navigation.goBack()
    }
  }, [deleteTodoMutation.isLoading, deleteTodoMutation.isSuccess, navigation])

  const openModalInput = () => {
    setIsModalVisible((e) => !e)
  }

  const onSubmitInput = async () => {
    if (textValue) {
      Keyboard.dismiss()
      await createTodoList({ todoId: data._id, name: textValue })
    }
  }

  const onPressDelete = () => {
    showAlert({
      title: 'Delete Todo',
      desc: 'Are you sure want to delete this todo?',
      func: async () => {
        await deleteTodo({ todoId: data._id })
      },
    })
  }

  const onModalHide = () => {
    setTextValue('')
  }

  return (
    <View style={styles.container}>
      <TodoOverview name={data.name} createdAt={data.createdAt} />
      <TodoTabView
        allTodos={allTodos}
        doneTodos={doneTodos}
        pendingTodos={pendingTodos}
        todoId={data._id}
      />
      <View style={styles.bottomAction}>
        <Button
          onPress={onPressDelete}
          text="Delete this Todo"
          isLoading={false}
          type="danger"
          width="50%"
        />
        <Button onPress={openModalInput} text="Add Todo List" isLoading={false} width="50%" />
      </View>
      <ModalInput
        isVisible={isModalVisible}
        placeholder="Create list todo"
        value={textValue}
        onChangeText={setTextValue}
        toggleModal={openModalInput}
        onSubmit={onSubmitInput}
        isLoading={createTodoListMutation.isLoading}
        onModalHide={onModalHide}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 10,
  },

  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
