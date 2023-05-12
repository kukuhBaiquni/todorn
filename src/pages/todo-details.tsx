import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native'
import { TodoDetailProps } from '../navigation'
import colors from '../constants/colors'
import commonFormat from '../helpers/date-format'
import Button from '../components/common/button'
import NoData from '../components/common/no-data'
import TodoOverview from '../components/data-entry/todo-overview'
import TodoListCard from '../components/data-entry/todo-list-card'

const { height, width } = Dimensions.get('screen')

export default function TodoDetail({ navigation, route }: TodoDetailProps) {
  const data = route.params?.todo
  console.log(data)

  return (
    <View style={styles.container}>
      <TodoOverview name={data.name} createdAt={data.createdAt} />
      {data.todoList.length ? (
        <ScrollView>
          <TodoListCard />
        </ScrollView>
      ) : (
        <NoData />
      )}
      <View style={styles.bottomAction}>
        <Button text="Delete this Todo" isLoading={false} type="danger" width="50%" />
        <Button text="Add Todo List" isLoading={false} width="50%" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 10,
  },

  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
