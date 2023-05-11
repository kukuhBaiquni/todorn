import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import Login from './pages/login'
import Main from './pages/main'

type NavigationParams = {
  Login: undefined
  Main: { new: boolean } | undefined
}

type LoginNavigationProp = StackNavigationProp<NavigationParams, 'Login'>
type MainNavigationProp = StackNavigationProp<NavigationParams, 'Main'>

type LoginRouteProp = RouteProp<NavigationParams, 'Login'>
type MainRouteProp = RouteProp<NavigationParams, 'Main'>

export type LoginProps = { navigation: LoginNavigationProp; route: LoginRouteProp }
export type MainProps = { navigation: MainNavigationProp; route: MainRouteProp }

const Stack = createStackNavigator<NavigationParams>()

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
    </Stack.Navigator>
  )
}
