import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {
  key: string
  data: string
  state: 'SET' | 'GET' | 'DELETE'
}

export default async function db({ key, data, state }: Props) {
  if (state === 'SET') {
    await AsyncStorage.setItem(key, data)
  } else if (state === 'GET') {
    const result = await AsyncStorage.getItem(key)
    return result
  } else {
    await AsyncStorage.clear()
  }
}
