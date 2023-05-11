import React, { useEffect, useState, useRef, useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  FlatList,
} from 'react-native'
import db from '../lib/async-storage'
import colors from '../constants/colors'
import { useGetTodosQuery } from '../services/todo'
import { MainProps } from '../navigation'
import showAlert from '../helpers/show-alert'
import commonFormat from '../helpers/date-format'
import Input from '../components/form/input'

const { width, height } = Dimensions.get('screen')
const arr = Array.from({ length: 120 }, (_, index) => ({ no: index }))

export default function Main({ navigation, route }: MainProps) {
  const isNew = route?.params?.new
  const [userId, setUserId] = useState('')
  const [textValue, setTextValue] = useState('')
  const { isLoading, isError, isSuccess, error, data } = useGetTodosQuery(
    { id: userId },
    { skip: !userId },
  )

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', showAlert)

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

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', showAlert)
    }
  }, [])

  const removeDb = async () => {
    await db({
      key: '',
      data: '',
      state: 'DELETE',
    })
    navigation.replace('Login')
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const openBottomSheet = () => {}
  const snapPoints = useMemo(() => ['20%', '80%', '90%'], [])
  console.log(data)
  return (
    <View style={styles.container}>
      {/* <Input
        onChangeText={setTextValue}
        value={textValue}
        borderless={true}
        placeholder="Create todo"
        maxLength={108}
      /> */}
      <View style={styles.welcomeBoard}>
        <Text style={styles.welcomeText}>Welcome{isNew ? '' : ' back'},</Text>
        <Text style={styles.captionText}>You can start creating todos now!</Text>
      </View>
      <FlatList
        data={arr}
        keyExtractor={(item) => item.no.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.todoCard}>
              <View>
                <Text style={styles.todoTitleText}>Item {item.no}</Text>
                <Text style={{ color: colors.BLUE }}>13 item(s)</Text>
              </View>
              <Text style={{ color: colors.BLACK, fontSize: 12 }}>{commonFormat(new Date())}</Text>
            </View>
          )
        }}
      />
      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.buttonCircle} onPress={openBottomSheet}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    color: colors.WHITE,
    fontSize: 32,
    fontWeight: 'bold',
  },
  captionText: {
    color: colors.WHITE,
  },
  todoCard: {
    height: 60,
    flexDirection: 'row',
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  todoTitleText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 100,
    width,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCircle: {
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
