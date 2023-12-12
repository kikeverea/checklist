import { View, StyleSheet } from 'react-native'
import LoginForm from './LoginForm'
import { Text } from 'react-native'
import { colors } from '../../styles/styles'
import KeyboardSafeContainer from '../../components/input/KeyboardSafeContainer'
import useUserSession from '../../hooks/useUserSession'
import { useNavigate, Link } from 'react-router-native'
import Toast from 'react-native-toast-message'

const Login = () => {

  const [_, login] = useUserSession()
  const navigate = useNavigate()

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
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
    <KeyboardSafeContainer contentContainerStyle={ styles.container }>
      <LoginForm onSubmit={ loginUser }/>
      <View>
        <Link to='/signup'>
          <Text>o crear cuenta nueva</Text>
        </Link>
      </View>
    </KeyboardSafeContainer>
  )
}

export default Login