import { Alert } from 'react-native'

type Props = {
  title?: string | undefined
  desc?: string | undefined
  func?: () => void | Promise<void>
}

export default function showAlert({ title, desc, func }: Props) {
  Alert.alert(
    title || 'Exit App',
    desc || 'Do you want to exit?',
    [
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      { text: 'No', onPress: () => {} },
      { text: 'Yes', onPress: func },
    ],
    { cancelable: false },
  )
  return true
}
