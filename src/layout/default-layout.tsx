import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import React, { ReactNode } from 'react'
import colors from '../constants/colors'

const { width, height } = Dimensions.get('screen')

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={styles.squareTop} />
        <View style={styles.squareBot} />
        {children}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  squareTop: {
    position: 'absolute',
    height: width * 0.7,
    width: width * 0.7,
    borderRadius: 500,
    backgroundColor: colors.LIME,
    transform: [{ rotate: '60deg' }],
    zIndex: -1,
    right: -100,
    top: -100,
  },
  squareBot: {
    position: 'absolute',
    height: width * 0.7,
    width: width * 0.7,
    borderRadius: 500,
    backgroundColor: colors.BLUE,
    transform: [{ rotate: '60deg' }],
    left: -100,
    top: height * 0.7,
  },
})
