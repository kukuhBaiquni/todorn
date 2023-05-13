import React, { useContext } from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import commonFormat from '../../helpers/date-format'
import colors from '../../constants/colors'
import TodoTabViewContext from '../../context/todo-tab-view-context'

type Props = {
  todoId: string
  name: string
  createdAt: string
}

const { width } = Dimensions.get('screen')

export default function TodoOverview({ name, createdAt, todoId }: Props) {
  const { goBack } = useNavigation()
  const ctx = useContext(TodoTabViewContext)

  return (
    <View style={styles.overviewWrapper}>
      <Pressable onPress={goBack}>
        <View style={styles.backButton}>
          <Text style={styles.backText}>{'Back'}</Text>
        </View>
      </Pressable>
      <View style={styles.overviewBanner}>
        <View style={styles.nameWithAction}>
          <Text style={styles.todoNameText}>{name} </Text>
        </View>
        <Text style={styles.dateCreatedText}>Created At {commonFormat(new Date(createdAt))}</Text>
        <Pressable onPress={() => ctx?.onOpenModal(todoId, 'updateTodo')}>
          <Text style={styles.editText}>EDIT</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overviewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  overviewBanner: {
    padding: 12,
    paddingVertical: 16,
    width: width * 0.8 - 10,
    backgroundColor: colors.BLUE,
  },
  backButton: {
    backgroundColor: colors.BLACK,
    flex: 1,
    width: width * 0.2 - 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameWithAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  editText: {
    color: colors.LIME,
    textAlign: 'left',
  },
  todoNameText: {
    color: colors.WHITE,
    fontSize: 24,
    flexWrap: 'wrap',
    width: width * 0.7,
  },
  dateCreatedText: {
    color: colors.WHITE,
    fontSize: 14,
  },
  backText: {
    color: colors.SEMI_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
