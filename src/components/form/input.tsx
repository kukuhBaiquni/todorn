import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import colors from '../../constants/colors'

type Props = {
  isError?: boolean | undefined
  errorMessage?: string | undefined
  borderless?: boolean | undefined
  onEnter?: () => void | undefined
  onBlur?: () => void | undefined
  onChangeText?: (text: string) => void
  value: string
  placeholder: string
  maxLength?: number
  autoFocus?: boolean
}

export default function Input(props: Props) {
  const {
    isError,
    errorMessage,
    borderless,
    onEnter,
    onBlur,
    onChangeText,
    value,
    placeholder,
    maxLength,
    autoFocus,
  } = props
  const styles = getStyles(borderless)

  return (
    <View>
      <TextInput
        placeholderTextColor={borderless ? colors.GRAY : colors.BLACK}
        style={styles.textInput}
        cursorColor={colors.BLACK}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        numberOfLines={1}
        multiline={false}
        maxLength={maxLength || 24}
        keyboardType="visible-password"
        onSubmitEditing={onEnter}
        onBlur={onBlur}
        autoFocus={autoFocus}
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
      borderWidth: borderless ? 0 : 1,
      borderColor: colors.BLACK,
      color: colors.BLACK,
      marginTop: 5,
      borderRadius: borderless ? 0 : 5,
      fontSize: borderless ? 24 : 16,
      paddingHorizontal: 12,
      paddingVertical: borderless ? 12 : 8,
      backgroundColor: borderless ? colors.SEMI_WHITE : 'transparent',
    },
    errorMessage: {
      color: colors.RED,
    },
  })
}
