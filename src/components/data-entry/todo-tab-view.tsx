import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, TabBar, TabBarProps, Route } from 'react-native-tab-view'
import TodoListDataView from './todo-list-data-view'
import { TodoListItem } from '../../types/todo'

import colors from '../../constants/colors'

type Props = {
  allTodos: TodoListItem[]
  doneTodos: TodoListItem[]
  pendingTodos: TodoListItem[]
  todoId: string
}

export default function TodoTabView({ allTodos, doneTodos, pendingTodos, todoId }: Props) {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'all', title: 'All' },
    { key: 'done', title: 'Done' },
    { key: 'pending', title: 'Pending' },
  ])

  const renderScene = ({ route }: { route: { key: string; title: string } }) => {
    switch (route.key) {
      case 'all':
        return <TodoListDataView data={allTodos} todoId={todoId} />
      case 'done':
        return <TodoListDataView data={doneTodos} todoId={todoId} />
      case 'pending':
        return <TodoListDataView data={pendingTodos} todoId={todoId} />
      default:
        return null
    }
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width, height: layout.height }}
      renderTabBar={(props) => (
        <CustomTabBar
          {...props}
          all={allTodos.length}
          done={doneTodos.length}
          pending={pendingTodos.length}
        />
      )}
    />
  )
}

type Todos = {
  all: number
  done: number
  pending: number
}

const CustomTabBar = (props: TabBarProps<Route> & Todos) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.BLUE }}
      style={{ backgroundColor: 'transparent', elevation: 0 }}
      inactiveColor={colors.GRAY}
      labelStyle={{ color: colors.BLUE }}
      getLabelText={({ route }) => {
        console.log(props, route)
        const routeKey: 'all' | 'done' | 'pending' | string = route.key
        const count =
          {
            all: props.all,
            done: props.done,
            pending: props.pending,
          }[routeKey] || 0

        return `${route.title || ''} (${count})`
      }}
    />
  )
}
