import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import db from '../lib/async-storage'
import colors from '../constants/colors'

export default function Main() {
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const getDb = async () => {
      const id = await db({
        key: 'userid',
        state: 'GET',
        data: '',
      })
      if (id) {
        setUserId(id)
      }
    }
    getDb().catch(console.error)
  }, [])

  return (
    <View>
      <Text style={styles.text}>Main</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colors.BLACK,
  },
})
