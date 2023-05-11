import { Alert, BackHandler } from 'react-native'

export default function showAlert(title?: string, desc?: string) {
  Alert.alert(
    title || 'Exit App',
    desc || 'Do you want to exit?',
    [
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      { text: 'No', onPress: () => {} },
      { text: 'Yes', onPress: () => BackHandler.exitApp() },
    ],
    { cancelable: false },
  )
  return true
}
