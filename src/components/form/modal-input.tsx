import React from 'react'
import Modal from 'react-native-modal'
import { View, Dimensions } from 'react-native'
import Input from './input'
import Button from '../common/button'
import colors from '../../constants/colors'
import inputRules from '../../constants/input-rules'

type Props = {
  toggleModal: () => void
  isVisible: boolean
  value: string
  onChangeText: (text: string) => void
  onSubmit: () => Promise<void>
  isLoading: boolean
  placeholder: string
  onModalHide?: () => void
}

const { width, height } = Dimensions.get('screen')

export default function ModalInput(props: Props) {
  const {
    toggleModal,
    isVisible,
    value,
    onChangeText,
    onSubmit,
    isLoading,
    placeholder,
    onModalHide,
  } = props

  return (
    <Modal
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      isVisible={isVisible}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      useNativeDriver
      deviceHeight={height}
      deviceWidth={width}
      onModalHide={onModalHide}
    >
      <View
        style={{
          height: height * 0.2,
          backgroundColor: colors.WHITE,
          paddingHorizontal: 10,
        }}
      >
        <Input
          onChangeText={onChangeText}
          value={value}
          borderless
          placeholder={placeholder}
          maxLength={inputRules.TODO_NAME_MAX_LENGTH}
        />
        <Button onPress={onSubmit} text="Save" isLoading={isLoading} />
      </View>
    </Modal>
  )
}
