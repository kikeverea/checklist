import { View, StyleSheet, Dimensions } from "react-native"
import { TextInput, HelperText } from "react-native-paper"
import 'react-native-vector-icons/MaterialCommunityIcons'
import { colors as themeColors } from '../../styles/styles'
import { useState } from 'react'

const FormInput = ({ name, label, value, setValue, setBlur, error, isPassword }) => {

  const [secureText, setSecureText] = useState(isPassword)

  const screenWidth = Dimensions.get('window').width
  
  const width = screenWidth - (48 * 2)
  const styles = StyleSheet.create({
    input: {
      width
    }
  })

  const passwordProps = secureText ? 
  {
    right: <TextInput.Icon icon="eye" onPress={ ()=> setSecureText(!secureText) }/>,
    secureTextEntry: secureText
  }
  : {}

  return (
    <View>
      <TextInput
        testID={ `form-input-${name}` }
        style={ styles.input }
        theme={{ colors: { primary: themeColors.primary, underlineColor:'transparent',}}}
        onChangeText={ value => setValue(value) }
        onBlur={ () => setBlur(true) }
        value={ value }
        mode='outlined'
        label={ label }
        {...passwordProps}
      />
      { error && <HelperText type="error" visible={ true }>{ error }</HelperText> }
    </View>
  )
}

export default FormInput