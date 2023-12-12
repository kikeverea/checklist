import { Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Platform } from 'react-native'

const KeyboardSafeContainer = ({ contentContainerStyle, children }) => {

  const screenHeight = Dimensions.get('window').height
  const screenWidth = Dimensions.get('window').width

  const contentStyle = StyleSheet.create({
    container: {
      ...contentContainerStyle,
      height: screenHeight,       // override height
      width: screenWidth          // override width
    },
  })

  return (
    <KeyboardAvoidingView
      behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
      style={{ justifyContent: 'center' }}
    >
      <TouchableWithoutFeedback onPress={ ()=> Keyboard.dismiss() }>
        <View style={ contentStyle.container }>
          { children }
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default KeyboardSafeContainer