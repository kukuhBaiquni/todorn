import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../../constants/colors'

export default function ProgressBar({ percentage }: { percentage: string }) {
  const styles = getStyles(percentage)
  return (
    <View style={styles.container}>
      <View style={styles.progressTrack}>
        <View style={styles.progressFill}></View>
      </View>
      <Text style={styles.percentText}>
        {percentage === '0'
          ? 'No progress'
          : percentage === '100.0'
          ? 'Completed'
          : `${percentage}%`}
      </Text>
    </View>
  )
}

function getStyles(percentage: string) {
  const percentText = `${percentage}%`
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      columnGap: 6,
      alignItems: 'center',
      marginTop: 5,
    },
    progressTrack: {
      position: 'relative',
      width: 50,
      height: 10,
      backgroundColor: colors.SEMI_WHITE,
      borderRadius: 10,
    },
    progressFill: {
      backgroundColor: colors.BLUE,
      borderRadius: 10,
      width: percentText,
      height: '100%',
    },
    percentText: { color: colors.BLUE },
  })
}
