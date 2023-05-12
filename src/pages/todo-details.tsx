import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native'
import { TodoDetailProps } from '../navigation'
import colors from '../constants/colors'
import commonFormat from '../helpers/date-format'
import Button from '../components/common/button'
import NoData from '../components/common/no-data'
import TodoOverview from '../components/data-entry/todo-overview'
import TodoListCard from '../components/data-entry/todo-list-card'
import ModalInput from '../components/form/modal-input'
import { useCreateTodoListMutation } from '../services/todo'

const { height, width } = Dimensions.get('screen')

export default function TodoDetail({ navigation, route }: TodoDetailProps) {
  const data = route.params?.todo
  const [createTodoList, createTodoListMutation] = useCreateTodoListMutation()

  const [todoName, setTodoName] = useState(data.name)
  const [todoList, setTodoList] = useState(data.todoList)
  const [textValue, setTextValue] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => setIsModalVisible((e) => !e)

  const onSubmitInput = async () => {
    //
  }

  console.log(data)
  return (
    <View style={styles.container}>
      <TodoOverview name={data.name} createdAt={data.createdAt} />
      {data.todoList.length ? (
        <ScrollView>
          <TodoListCard />
        </ScrollView>
      ) : (
        <NoData />
      )}
      <View style={styles.bottomAction}>
        <Button text="Delete this Todo" isLoading={false} type="danger" width="50%" />
        <Button text="Add Todo List" isLoading={false} width="50%" />
      </View>
      <ModalInput
        isVisible={isModalVisible}
        value={textValue}
        onChangeText={setTextValue}
        toggleModal={toggleModal}
        onSubmit={onSubmitInput}
        isLoading={createTodoListMutation.isLoading}
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
