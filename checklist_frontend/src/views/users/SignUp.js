import { View } from "react-native"
import { Dimensions, StyleSheet } from "react-native"
import { useNavigate } from 'react-router-native';
import Toast from 'react-native-toast-message'

import SignUpForm from "./SignUpForm"
import KeyboardSafeScrollableContainer from "../input/KeyboardSafeScrollableContainer"
import usersService from "../../services/usersService"

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

  const navigate = useNavigate()

  const signUp = async (values) => {
    const res = await usersService.createNewUser(values)

    if (res.success)
      navigate('/login')
    else 
    {
      Toast.show({
        type: 'error',
        text1: 'La cuenta no ha podido ser creada',
        text2: `Error: ${ Object.keys(res.data).join(', ') }`,
        position: 'bottom'
      });
    }
  }

  return (
    <KeyboardSafeScrollableContainer style={ styles.container }>
      <View>
          <SignUpForm onSubmit={ signUp }/>
      </View>
    </KeyboardSafeScrollableContainer>
  )
}

export default Signup