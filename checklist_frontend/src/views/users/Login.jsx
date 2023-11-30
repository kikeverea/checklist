import { View, StyleSheet } from 'react-native'
import LoginForm from './LoginForm'
import { Text, Dimensions } from 'react-native'
import { colors } from '../../styles/styles'
import KeyboardSafeContainer from '../input/KeyboardSafeContainer'
import useSession from '../../hooks/useSession'
import { useNavigate } from 'react-router-native'
import Toast from 'react-native-toast-message'

const Login = () => {

  const screenHeight = Dimensions.get('window').height
  const screenWidth = Dimensions.get('window').width
  const [login] = useSession()
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

  const loginUser = async credentials => {
    const { success, error } = await login(credentials)

    if (success) {
      navigate('/')
    }
    else {
      Toast.show({
        type: 'error',
        text1: 'No se ha podido iniciar sesión',
        text2: `Error: ${ error }`,
        position: 'bottom'
      })
    }
  }

  return (
    <KeyboardSafeContainer style={styles.container}>
      <View style={ [styles.container, styles.formContainer] }>
        <LoginForm onSubmit={ loginUser }/>
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