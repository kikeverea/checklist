import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import LoginForm from './LoginForm'
import { Text, Dimensions } from 'react-native'
import { colors } from '../../styles/styles'
import KeyboardSafeContainer from '../input/KeyboardSafeContainer'

const Login = () => {

  const screenHeight = Dimensions.get('window').height
  const screenWidth = Dimensions.get('window').width

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: screenHeight,
      width: screenWidth
    },
    formContainer: {
      gap: 16
    },
    secondaryText: {
      color: colors.textSecondary,
      fontStyle: 'italic'
    }
  })

  return (
    <KeyboardSafeContainer style={styles.container}>
      <View style={ [styles.container, styles.formContainer] }>
        <LoginForm onSubmit={ values => console.log(values) }/>
        <View>
          <Text>
            o crear cuenta nueva
          </Text>
        </View>
      </View>
    </KeyboardSafeContainer>
  )
}

export default Login