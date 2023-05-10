import React from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import Toast, { ToastConfigParams } from 'react-native-toast-message'
import colors from './constants/colors'

import Navigation from './navigation'

import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

const { width } = Dimensions.get('screen')

function ErrorToast({ text1, text2 }: ToastConfigParams<object>) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{text1}</Text>
      <Text style={styles.descText}>{text2}</Text>
    </View>
  )
}

const toastConfig = {
  e: (props: ToastConfigParams<object>) => ErrorToast(props),
}

function WrappedApp() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigation />
      </Provider>
      <Toast config={toastConfig} />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: width * 0.95,
    backgroundColor: colors.RED,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  descText: {
    color: colors.WHITE,
  },
})

export default WrappedApp
