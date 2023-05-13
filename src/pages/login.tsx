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
import errType from '../constants/error-messages'
import inputRules from '../constants/input-rules'

const { height, width } = Dimensions.get('screen')

export default function Login({ navigation }: LoginProps) {
  const [textValue, setTextValue] = useState('')
  const [isPreload, setIsPreload] = useState(false)

  const [registerUser, mutationRegister] = useRegisterUserMutation()

  const onSubmit = async () => {
    if (textValue) await registerUser({ name: textValue })
    Keyboard.dismiss()
  }

  /**
   * If user already registered, it will
   * automatically redirect to main page
   */

  useEffect(() => {
    const getDb = async () => {
      const id = await db({ key: 'userid', state: 'GET', data: '' })
      if (id) {
        // navigation.replace('Main')
      } else {
        setIsPreload(false)
      }
    }
    getDb().catch(console.error)
  }, [navigation])

  /**
   * WHen registration process is done
   * user will be redirected to main page
   */

  useEffect(() => {
    if (mutationRegister.isSuccess && !mutationRegister.isLoading) {
      let id: string
      if (mutationRegister.data?._id) {
        id = mutationRegister.data._id
      }
      const setDb = async () => {
        await db({ key: 'userid', data: id, state: 'SET' })
      }
      setDb().catch(console.error)
      navigation.navigate('Main', {
        new: true,
      })
    }
  }, [
    mutationRegister.isSuccess,
    mutationRegister.isLoading,
    navigation,
    mutationRegister.data?._id,
  ])

  /**
   * This effect run when some error happening during
   * registration process
   */

  useEffect(() => {
    if (mutationRegister.isError && !mutationRegister.isLoading && !mutationRegister.isSuccess) {
      const err = mutationRegister.error as number
      Toast.show({
        type: 'e',
        text1: 'Something Wrong!',
        text2: errType(err),
        position: 'top',
        topOffset: 10,
      })
    }
  }, [
    mutationRegister.isError,
    mutationRegister.isLoading,
    mutationRegister.error,
    mutationRegister.isSuccess,
  ])

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
            <Input
              placeholder="Your name..."
              value={textValue}
              onChangeText={setTextValue}
              maxLength={inputRules.USER_NAME_MAX_LENGTH}
            />
            <Button isLoading={mutationRegister.isLoading} text="Start now!" onPress={onSubmit} />
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
