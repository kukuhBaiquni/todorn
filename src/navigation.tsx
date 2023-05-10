import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import Login from './pages/login'
import Main from './pages/main'

export type NavigationParams = {
  Login: undefined
  Main: { new: boolean } | undefined
}

type LoginNavigationProp = StackNavigationProp<NavigationParams, 'Login'>
type MainNavigationProp = StackNavigationProp<NavigationParams, 'Main'>

export type LoginProps = { navigation: LoginNavigationProp }
export type MainProps = { navigation: MainNavigationProp }

const Stack = createStackNavigator<NavigationParams>()

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
    </Stack.Navigator>
  )
}
