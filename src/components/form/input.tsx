import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import colors from '../../constants/colors'

interface Props {
  isError?: boolean | undefined
  errorMessage?: string | undefined
  borderless?: boolean | undefined
  onEnter?: () => void | undefined
  onBlur?: () => void | undefined
  onChangeText?: (text: string) => void
  value: string
}

export default function Input(props: Props) {
  const { isError, errorMessage, borderless, onEnter, onBlur, onChangeText, value } = props
  const styles = getStyles(borderless)

  return (
    <View>
      <TextInput
        placeholderTextColor={colors.BLACK}
        style={styles.textInput}
        cursorColor={colors.BLACK}
        placeholder="Your name.."
        underlineColorAndroid="transparent"
        numberOfLines={1}
        multiline={false}
        maxLength={18}
        keyboardType="visible-password"
        onSubmitEditing={onEnter}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value || ''}
      />
      <Text style={styles.errorMessage}>{isError ? errorMessage : ''}</Text>
    </View>
  )
}

function getStyles(borderless: boolean | undefined) {
  return StyleSheet.create({
    textInput: {
      borderWidth: borderless ? 0 : 2,
      borderColor: colors.BLACK,
      color: colors.BLACK,
      marginTop: 5,
      borderRadius: 5,
      fontSize: 24,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: borderless ? colors.WHITE : 'transparent',
    },
    errorMessage: {
      color: colors.RED,
    },
  })
}
