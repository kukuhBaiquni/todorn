import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import colors from '../../constants/colors'
import commonFormat from '../../helpers/date-format'
import { ResponseGetTodos } from '../../services/todo'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { NavigationParams } from '../../navigation'

export default function TodoCard(item: ResponseGetTodos) {
  const { navigate } = useNavigation<NavigationProp<NavigationParams>>()

  return (
    <Pressable onPress={() => navigate('TodoDetail', { todo: item })}>
      <View style={styles.todoCard}>
        <View>
          <Text style={styles.todoTitleText}>{item.name}</Text>
          <Text style={{ color: colors.BLUE }}>{item?.todoList?.length} item(s)</Text>
        </View>
        <Text style={styles.dateText}>{commonFormat(new Date(item.createdAt))}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  todoCard: {
    height: 60,
    flexDirection: 'row',
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  todoTitleText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: { color: colors.BLACK, fontSize: 12 },
})
