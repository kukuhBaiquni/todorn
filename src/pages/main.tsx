import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import Toast from 'react-native-toast-message'
import db from '../lib/async-storage'
import colors from '../constants/colors'
import { useGetTodosQuery, useCreateTodoMutation } from '../services/todo'
import { MainProps } from '../navigation'
import showAlert from '../helpers/show-alert'
import TodoCard from '../components/data-entry/todo-card'
import NoData from '../components/common/no-data'
import errType from '../constants/error-messages'
import ModalInput from '../components/form/modal-input'
import { useIsFocused } from '@react-navigation/native'

const { width, height } = Dimensions.get('screen')

export default function Main({ route }: MainProps) {
  const isFocused = useIsFocused()
  const isNew = route?.params?.new
  const [userId, setUserId] = useState('')
  const [textValue, setTextValue] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { isLoading, isError, isSuccess, error, data, refetch } = useGetTodosQuery(
    { userId },
    { skip: !userId },
  )

  const [createTodo, createTodoMutation] = useCreateTodoMutation()

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', showAlert)
    } else {
      BackHandler.removeEventListener('hardwareBackPress', showAlert)
    }
  }, [isFocused])

  useEffect(() => {
    const getDb = async () => {
      const id = await db({
        key: 'userid',
        state: 'GET',
        data: '',
      })
      if (id) {
        setUserId(id)
      }
    }
    getDb().catch(console.error)
  }, [])

  const submitTodo = async () => {
    if (textValue) await createTodo({ name: textValue, owner: userId })
  }

  useEffect(() => {
    // When create todo process is success it will run this code
    const isCreateTodoError =
      !createTodoMutation.isSuccess && createTodoMutation.isError && !createTodoMutation.isLoading
    const isSuccess =
      createTodoMutation.isSuccess && !createTodoMutation.isError && !createTodoMutation.isLoading
    if (isSuccess) {
      setTextValue('')
      setIsModalVisible(false)
    }

    // When create todo or get todo process is failed it will run this code
    if (isCreateTodoError || isError) {
      const err = (createTodoMutation.error as number) || (error as number)
      Toast.show({
        type: 'e',
        text1: 'Something Wrong!',
        text2: errType(err),
        position: 'top',
        topOffset: 10,
      })
    }
  }, [
    createTodoMutation.isSuccess,
    createTodoMutation.isError,
    createTodoMutation.isLoading,
    createTodoMutation.error,
    error,
    isError,
  ])

  const toggleModal = () => setIsModalVisible((e) => !e)

  const isNoData = !data?.length && !isLoading && isSuccess

  return (
    <View style={styles.container}>
      <View style={styles.welcomeBoard}>
        <View>
          <Text style={styles.welcomeText}>Welcome{isNew ? '' : ' back'},</Text>
          <Text style={styles.captionText}>You can start creating todos now!</Text>
        </View>
        {(isLoading || createTodoMutation.isLoading) && <ActivityIndicator color={colors.WHITE} />}
      </View>
      {isNoData && <NoData />}
      <FlatList
        data={data}
        onRefresh={refetch}
        refreshing={isLoading}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TodoCard {...item} />}
      />
      <TouchableOpacity style={styles.buttonCircle} onPress={toggleModal}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
      <ModalInput
        isVisible={isModalVisible}
        value={textValue}
        onChangeText={setTextValue}
        toggleModal={toggleModal}
        onSubmit={submitTodo}
        isLoading={createTodoMutation.isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  welcomeBoard: {
    height: height * 0.1,
    width,
    backgroundColor: colors.BLUE,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  welcomeText: {
    color: colors.WHITE,
    fontSize: 32,
    fontWeight: 'bold',
  },
  captionText: {
    color: colors.WHITE,
  },
  buttonCircle: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
    height: 80,
    width: 80,
    backgroundColor: colors.BLUE,
    zIndex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    color: colors.WHITE,
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: -5,
  },
})
