import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import commonFormat from '../../helpers/date-format'

export default function TodoListCard() {
  return (
    <View style={styles.todoListCard}>
      <View style={styles.todoListOverview}>
        <Text style={styles.todoListNameText}>
          Grandong bin Laden <Text style={styles.editText}>EDIT</Text>
        </Text>
        <Text style={styles.dateText}>{commonFormat(new Date())}</Text>
        <Text style={styles.statusText}>(Done)</Text>
      </View>
      <View style={styles.radioWrapper}>
        <View style={styles.radio}>
          <Text style={styles.radioText}>√</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  todoListCard: {
    height: 80,
    elevation: 2,
    backgroundColor: colors.SEMI_WHITE,
    paddingHorizontal: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoListOverview: {
    width: '90%',
  },
  todoListNameText: {
    color: colors.BLACK,
    fontSize: 20,
  },
  editText: {
    color: colors.BLUE,
    fontSize: 16,
  },
  dateText: {
    color: colors.GRAY,
    fontSize: 16,
  },
  statusText: {
    color: colors.GREEN,
    fontSize: 16,
  },
  radioWrapper: {
    width: '10%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GREEN,
  },
  radioText: {
    color: colors.WHITE,
  },
})
