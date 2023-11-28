import { View, StyleSheet } from 'react-native'
import LoginForm from './LoginForm'
import { Text, Dimensions } from 'react-native'
import { colors } from '../../styles/styles'
import KeyboardSafeContainer from '../input/KeyboardSafeContainer'
import useLogin from '../../hooks/useLogin'
import { useNavigate } from 'react-router-native'
import Toast from 'react-native-toast-message'

const Login = () => {

  const screenHeight = Dimensions.get('window').height
  const screenWidth = Dimensions.get('window').width
  const loginUser = useLogin()
  const navigate = useNavigate()

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

  const login = async credentials => {
    const error = await loginUser(credentials)

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'No se ha podido iniciar sesión',
        text2: `Error: ${error.message}`,
        position: 'bottom'
      })
    }
    else {
      navigate('/')
    }
  }

  return (
    <KeyboardSafeContainer style={styles.container}>
      <View style={ [styles.container, styles.formContainer] }>
        <LoginForm onSubmit={ login }/>
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