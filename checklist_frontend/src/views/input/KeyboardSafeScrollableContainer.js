import { StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Platform } from 'react-native'

const KeyboardSafeScrollableContainer = ({ style, children }) => {

  const screenHeight = Dimensions.get('window').height
  const screenWidth = Dimensions.get('window').width

  const styles = StyleSheet.create({
    container: {
      ...style,
      height: screenHeight, // override height
      width: screenWidth    // override width
    }
  })

  return (
    <KeyboardAwareScrollView
      behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
      contentContainerStyle={ styles.container }
    >
      <TouchableWithoutFeedback style={ styles.container } onPress={ ()=> Keyboard.dismiss() }>
        { children }
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}

export default KeyboardSafeScrollableContainer