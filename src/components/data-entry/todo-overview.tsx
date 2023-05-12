import React from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'
import commonFormat from '../../helpers/date-format'
import colors from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

type Props = {
  name: string
  createdAt: string
}

const { width } = Dimensions.get('screen')

export default function TodoOverview({ name, createdAt }: Props) {
  const { goBack } = useNavigation()

  return (
    <View style={styles.overviewWrapper}>
      <Pressable onPress={goBack}>
        <View style={styles.backButton}>
          <Text style={styles.backText}>{'Back'}</Text>
        </View>
      </Pressable>
      <View style={styles.overviewBanner}>
        <View style={styles.nameWithAction}>
          <Text style={styles.todoNameText}>
            {name}{' '}
            <Pressable>
              <Text style={styles.editText}>EDIT</Text>
            </Pressable>
          </Text>
        </View>
        <Text style={styles.dateCreatedText}>Created At {commonFormat(new Date(createdAt))}</Text>
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
