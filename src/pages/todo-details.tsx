import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Keyboard } from 'react-native'
import Toast from 'react-native-toast-message'

import { TodoDetailProps } from '../navigation'
import Button from '../components/common/button'
import TodoOverview from '../components/data-entry/todo-overview'
import ModalInput from '../components/form/modal-input'
import {
  useCreateTodoListMutation,
  useDeleteTodoMutation,
  useUpdateTodoListMutation,
  useUpdateTodoMutation,
} from '../services/todo'
import { useAppSelector } from '../lib/redux'
import { TodoListItem, ResponseGetTodos } from '../types/todo'
import showAlert from '../helpers/show-alert'
import TodoTabView from '../components/data-entry/todo-tab-view'
import TodoTabViewContext, { MutationType } from '../context/todo-tab-view-context'

const { width } = Dimensions.get('screen')

export default function TodoDetail({ navigation, route }: TodoDetailProps) {
  const data = route.params?.todo
  const [createTodoList, createTodoListMutation] = useCreateTodoListMutation()
  const [deleteTodo, deleteTodoMutation] = useDeleteTodoMutation()
  const [updateTodo, updateTodoMutation] = useUpdateTodoMutation()
  const [updateTodoList, updateTodoListMutation] = useUpdateTodoListMutation()

  const reducerData = useAppSelector(
    (state) => state.todoApi.queries[`getTodos({"userId":"${data.owner}"})`] ?? { data: [] },
  )

  const allTodos = reducerData?.data as ResponseGetTodos[]

  /**
   * Basically currentTodo and data is returning same value
   * but currentTodo is reactive value that can change at anytime
   */

  const currentTodo = useMemo(
    () => allTodos.find((item) => item?._id === data?._id),
    [data._id, allTodos],
  ) as ResponseGetTodos

  const allTodoList: TodoListItem[] = useMemo(
    () => allTodos.find((item) => item?._id === data?._id)?.todoList || [],
    [data._id, allTodos],
  )

  const doneTodoList = useMemo(() => allTodoList.filter((item) => item.isDone), [allTodoList])
  const pendingTodoList = useMemo(() => allTodoList.filter((item) => !item.isDone), [allTodoList])

  const [mutationTarget, setMutationTarget] = useState('')

  const [mutationType, setMutationType] = useState<MutationType>('createTodoList')

  const [textValue, setTextValue] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  /**
   * This effect occur when modal input is closed
   */

  useEffect(() => {
    if (!isModalVisible) {
      setTextValue('')
    }
  }, [isModalVisible])

  /**
   * Below effect occur when updating, creating or deleting todo/todo list
   * based on mutation state of each process
   */

  /**
   * This effect occur when creating todo list success or some error happen
   * during create todo process
   */

  useEffect(() => {
    if (createTodoListMutation.isSuccess && !createTodoListMutation.isLoading) {
      setIsModalVisible(false)
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

  /**
   * This effect occur when deleting todo list is success or some error happen
   * during deleting todo
   */

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

    if (!deleteTodoMutation.isLoading && deleteTodoMutation.isError) {
      Toast.show({
        type: 'e',
        text1: 'Delete Todo',
        text2: 'Failed to delete todo list',
        position: 'top',
        topOffset: 10,
      })
      navigation.goBack()
    }
  }, [
    deleteTodoMutation.isLoading,
    deleteTodoMutation.isSuccess,
    deleteTodoMutation.isError,
    navigation,
  ])

  /**
   * This effect occur when updating todo list is success or some error happen
   * during updating todo list
   */

  useEffect(() => {
    if (!updateTodoListMutation.isLoading && updateTodoListMutation.isSuccess) {
      setIsModalVisible(false)
    }

    if (!updateTodoListMutation.isLoading && updateTodoListMutation.isError) {
      Toast.show({
        type: 'e',
        text1: 'Update Todo list',
        text2: 'Failed to update todo list',
        position: 'top',
        topOffset: 10,
      })
    }
  }, [
    updateTodoListMutation.isLoading,
    updateTodoListMutation.isSuccess,
    updateTodoListMutation.isError,
  ])

  /**
   * This effect occur when updating todo is success or some error happen
   * during updating todo
   */

  useEffect(() => {
    if (!updateTodoMutation.isLoading && updateTodoMutation.isSuccess) {
      setIsModalVisible(false)
    }

    if (!updateTodoMutation.isLoading && updateTodoMutation.isError) {
      Toast.show({
        type: 'e',
        text1: 'Update Todo list',
        text2: 'Failed to update todo list',
        position: 'top',
        topOffset: 10,
      })
    }
  }, [updateTodoMutation.isLoading, updateTodoMutation.isSuccess, updateTodoMutation.isError])

  const openModalInput = () => {
    setIsModalVisible((e) => !e)
  }

  const onSubmitInput = async () => {
    if (textValue) {
      Keyboard.dismiss()
      const actionType = {
        createTodoList: () => createTodoList({ todoId: data._id, name: textValue }),
        updateTodo: () => updateTodo({ todoId: data._id, name: textValue }),
        updateTodoList: () =>
          updateTodoList({ todoId: data._id, todoListId: mutationTarget, name: textValue }),
      }[mutationType]
      await actionType()
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

  const onOpenModal = useCallback(
    (todoListId: string | typeof currentTodo._id, operation: MutationType) => {
      setIsModalVisible(true)
      const target = allTodoList.find((item) => item._id === todoListId)?.name
      if (operation !== 'createTodoList') {
        setTextValue(target || currentTodo.name)
      }
      setMutationTarget(todoListId)
      setMutationType(operation)
    },
    [allTodoList, currentTodo],
  )

  return (
    <View style={styles.container}>
      <TodoTabViewContext.Provider value={{ onOpenModal }}>
        <TodoOverview name={currentTodo.name} createdAt={data.createdAt} todoId={data._id} />
        <TodoTabView
          allTodoList={allTodoList}
          doneTodoList={doneTodoList}
          pendingTodoList={pendingTodoList}
          todoId={data._id}
        />
      </TodoTabViewContext.Provider>
      <View style={styles.bottomAction}>
        <Button
          onPress={onPressDelete}
          text="Delete this Todo"
          isLoading={false}
          type="danger"
          width="50%"
        />
        <Button
          onPress={() => onOpenModal(data._id, 'createTodoList')}
          text="Add Todo List"
          isLoading={false}
          width="50%"
        />
      </View>
      <ModalInput
        isVisible={isModalVisible}
        placeholder="Create list todo"
        value={textValue}
        onChangeText={setTextValue}
        toggleModal={openModalInput}
        onSubmit={onSubmitInput}
        isLoading={
          createTodoListMutation.isLoading ||
          updateTodoMutation.isLoading ||
          updateTodoListMutation.isLoading
        }
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
