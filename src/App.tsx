import React from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import Toast, { ToastConfigParams } from 'react-native-toast-message'

import Navigation from './navigation'
import { ErrorToast, SuccessToast } from './helpers/custom-toast'

import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

const toastConfig = {
  e: (props: ToastConfigParams<object>) => ErrorToast(props),
  s: (props: ToastConfigParams<object>) => SuccessToast(props),
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

export default WrappedApp
