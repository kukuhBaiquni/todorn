import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import React from 'react'
import Login from './pages/login'
import Main from './pages/main'
import TodoDetail from './pages/todo-details'
import { ResponseGetTodos } from './types/todo'

export type NavigationParams = {
  Login: undefined
  Main: { new: boolean } | undefined
  TodoDetail: { todo: ResponseGetTodos }
}

type LoginNavigationProp = StackNavigationProp<NavigationParams, 'Login'>
type MainNavigationProp = StackNavigationProp<NavigationParams, 'Main'>
type TodoDetailNavigationProp = StackNavigationProp<NavigationParams, 'TodoDetail'>

type LoginRouteProp = RouteProp<NavigationParams, 'Login'>
type MainRouteProp = RouteProp<NavigationParams, 'Main'>
type TodoDetailRouteProp = RouteProp<NavigationParams, 'TodoDetail'>

export type LoginProps = { navigation: LoginNavigationProp; route: LoginRouteProp }
export type MainProps = { navigation: MainNavigationProp; route: MainRouteProp }
export type TodoDetailProps = { navigation: TodoDetailNavigationProp; route: TodoDetailRouteProp }

const Stack = createStackNavigator<NavigationParams>()

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
      <Stack.Screen options={{ headerShown: false }} name="TodoDetail" component={TodoDetail} />
    </Stack.Navigator>
  )
}
