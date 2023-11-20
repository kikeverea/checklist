import { View } from "react-native"
import { Dimensions, StyleSheet } from "react-native"

import SignUpForm from "./SignUpForm"
import KeyboardSafeScrollableContainer from "../input/KeyboardSafeScrollableContainer"

const Signup = () => {

  const screenHeight = Dimensions.get('window').height
  const screenWidth = Dimensions.get('window').width

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: screenHeight,
      width: screenWidth,
      paddingBottom: 48
    }
  })

  return (
    <KeyboardSafeScrollableContainer style={ styles.container }>
      <View>
          <SignUpForm onSubmit={ values => console.log(values) }/>
      </View>
    </KeyboardSafeScrollableContainer>
  )
}

export default Signup