import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Keyboard } from 'react-native'
import Toast from 'react-native-toast-message'
import { LoginProps } from '../navigation'
import Layout from '../layout/default-layout'
import colors from '../constants/colors'
import Input from '../components/form/input'
import Button from '../components/common/button'
import { useRegisterUserMutation } from '../services/register'
import db from '../lib/async-storage'
import errType, { fallback, ErrorMessage } from '../constants/error-messages'

const { height, width } = Dimensions.get('screen')

export default function Login({ navigation }: LoginProps) {
  const [textValue, setTextValue] = useState('')
  const [isPreload, setIsPreload] = useState(false)

  const [registerUser, { isLoading, isError, isSuccess, error, data }] = useRegisterUserMutation()

  const onSubmit = async () => {
    await registerUser({ name: textValue })
    Keyboard.dismiss()
  }

  useEffect(() => {
    const getDb = async () => {
      const id = await db({
        key: 'userid',
        state: 'GET',
        data: '',
      })
      if (id) {
        navigation.replace('Main')
      } else {
        setIsPreload(false)
      }
    }
    getDb().catch(console.error)
  }, [navigation])

  useEffect(() => {
    if (isSuccess && !isLoading) {
      console.log('masuk')
      let id: string
      if (data?._id) {
        id = data._id
      }
      const setDb = async () => {
        await db({
          key: 'userid',
          data: id,
          state: 'SET',
        })
      }
      setDb().catch(console.error)
      navigation.replace('Main', {
        new: true,
      })
    }
  }, [isSuccess, isLoading, navigation, data?._id])

  useEffect(() => {
    if (isError && !isLoading && !isSuccess) {
      let message = ''
      if (errType[error]) {
        message = errType[error]
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      Toast.show({
        type: 'e',
        text1: 'Something Wrong!',
        text2: message || fallback,
        position: 'top',
        topOffset: 10,
      })
    }
  }, [isError, isLoading, error, isSuccess])

  return (
    <Layout>
      {isPreload ? (
        <View style={styles.preloadContainer}>
          <ActivityIndicator size="large" color={colors.BLUE} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Welcome,</Text>
            <Text style={styles.question}>what is your name?</Text>
            <Input value={textValue} onChangeText={setTextValue} />
            <Button isLoading={isLoading} text="Start now!" onPress={onSubmit} />
          </View>
        </View>
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    height,
  },
  preloadContainer: {
    height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    paddingHorizontal: width * 0.1,
    marginTop: height * 0.25,
  },
  textGeneral: {
    color: colors.BLACK,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.BLUE,
  },
  question: {
    color: colors.BLACK,
    fontSize: 24,
    lineHeight: 25,
  },
})
