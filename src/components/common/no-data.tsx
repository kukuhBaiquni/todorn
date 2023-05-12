import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import colors from '../../constants/colors'

export default function NoData() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No data</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.BLACK,
    fontSize: 16,
    textAlign: 'center',
    marginTop: -100,
  },
})
