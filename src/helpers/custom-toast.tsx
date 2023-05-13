import React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { ToastConfigParams } from 'react-native-toast-message'
import colors from '../constants/colors'

const { width } = Dimensions.get('screen')

export function ErrorToast({ text1, text2 }: ToastConfigParams<object>) {
  return (
    <View style={[styles.container, styles.e]}>
      <Text style={styles.titleText}>{text1}</Text>
      <Text style={styles.descText}>{text2}</Text>
    </View>
  )
}

export function SuccessToast({ text1, text2 }: ToastConfigParams<object>) {
  return (
    <View style={[styles.container, styles.s]}>
      <Text style={styles.titleText}>{text1}</Text>
      <Text style={styles.descText}>{text2}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: width * 0.95,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  e: { backgroundColor: colors.RED },
  s: { backgroundColor: colors.GREEN },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  descText: {
    color: colors.WHITE,
  },
})
