import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import colors from '../../constants/colors'

type Props = {
  onPress?: () => Promise<void>
  text: string
  isLoading: boolean
}

export default function Button(props: Props) {
  const { onPress, text, isLoading } = props
  const styles = getStyles(isLoading)

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

function getStyles(isLoading: boolean) {
  return StyleSheet.create({
    nextButton: {
      backgroundColor: isLoading ? colors.GRAY : colors.BLUE,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      height: 50,
      marginTop: 15,
    },
    buttonText: {
      fontSize: 20,
      color: colors.WHITE,
    },
  })
}
