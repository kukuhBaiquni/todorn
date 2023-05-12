import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import colors from '../../constants/colors'

type Props = {
  onPress?: () => Promise<void>
  text: string
  isLoading: boolean
  type?: 'primary' | 'danger'
  width?: string | number | undefined
}

export default function Button(props: Props) {
  const { onPress, text, isLoading, type, width } = props
  const styles = getStyles(isLoading, type === 'danger', width)

  return (
    <TouchableOpacity disabled={isLoading} onPress={onPress} style={styles.nextButton}>
      {isLoading ? (
        <ActivityIndicator color={colors.WHITE} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  )
}

function getStyles(isLoading: boolean, isDanger: boolean, width: string | number | undefined) {
  return StyleSheet.create({
    nextButton: {
      backgroundColor: isLoading ? colors.GRAY : isDanger ? colors.RED : colors.BLUE,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: width ? 0 : 5,
      height: 50,
      marginTop: 15,
      width: width,
    },
    buttonText: {
      fontSize: 20,
      color: colors.WHITE,
    },
  })
}
