import React, { useState, useEffect } from 'react'
import { useWindowDimensions, ActivityIndicator, View } from 'react-native'
import { TabView, TabBar, TabBarProps, Route } from 'react-native-tab-view'
import TodoListDataView from './todo-list-data-view'
import { TodoListItem } from '../../types/todo'

import colors from '../../constants/colors'

type Props = {
  allTodoList: TodoListItem[]
  doneTodoList: TodoListItem[]
  pendingTodoList: TodoListItem[]
  todoId: string
}

export default function TodoTabView({ allTodoList, doneTodoList, pendingTodoList, todoId }: Props) {
  const layout = useWindowDimensions()

  const [showLoader, setShowLoader] = useState(true)

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'all', title: 'All' },
    { key: 'done', title: 'Done' },
    { key: 'pending', title: 'Pending' },
  ])

  const renderScene = ({ route }: { route: { key: string; title: string } }) => {
    switch (route.key) {
      case 'all':
        return <TodoListDataView data={allTodoList} todoId={todoId} />
      case 'done':
        return <TodoListDataView data={doneTodoList} todoId={todoId} />
      case 'pending':
        return <TodoListDataView data={pendingTodoList} todoId={todoId} />
      default:
        return null
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false)
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  if (showLoader) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.BLUE} size="large" />
      </View>
    )
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
          all={allTodoList.length}
          done={doneTodoList.length}
          pending={pendingTodoList.length}
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
