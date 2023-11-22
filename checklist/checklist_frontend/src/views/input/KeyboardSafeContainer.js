import { StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"

const KeyboardSafeContainer = ({ style, children }) => {

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
    <KeyboardAvoidingView
      behavior={ 'height' }
      style={ styles.container }
    >
      <TouchableWithoutFeedback style={ styles.container } onPress={ ()=> Keyboard.dismiss() }>
        { children }
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default KeyboardSafeContainer