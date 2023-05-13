import React, { useMemo } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import colors from '../../constants/colors'
import commonFormat from '../../helpers/date-format'
import { ResponseGetTodos } from '../../types/todo'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { NavigationParams } from '../../navigation'
import ProgressBar from '../common/progress-bar'

export default function TodoCard(item: ResponseGetTodos) {
  const { navigate } = useNavigation<NavigationProp<NavigationParams>>()
  console.log(item)

  const percentage = useMemo(() => {
    const allTodoList = item.todoList.length
    const doneTodoList = item.todoList.filter((item) => item.isDone).length

    if (doneTodoList === 0) {
      return '0'
    }

    return ((doneTodoList / allTodoList) * 100).toFixed(1)
  }, [item.todoList])

  return (
    <Pressable onPress={() => navigate('TodoDetail', { todo: item })}>
      <View style={styles.todoCard}>
        <View>
          <Text style={styles.todoTitleText}>{item.name}</Text>
          <Text style={{ color: colors.BLUE }}>{item?.todoList?.length} item(s)</Text>
          <ProgressBar percentage={percentage} />
        </View>
        <Text style={styles.dateText}>{commonFormat(new Date(item.createdAt))}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  todoCard: {
    height: 80,
    flexDirection: 'row',
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  todoTitleText: {
    color: colors.BLACK,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: { color: colors.BLACK, fontSize: 12 },
})
