import { StyleSheet, Dimensions } from "react-native"
import { TextInput } from "react-native-paper"
import { useState } from "react"
import 'react-native-vector-icons/MaterialCommunityIcons'
import { colors as themeColors } from "../../styles/styles"

const FormInput = ({ name, label, value, isPassword, handleChange, ...props }) => {

  const [secureText, setSecureText] = useState(isPassword)

  const screenWidth = Dimensions.get('window').width
  
  const width = screenWidth - (48 * 2)
  const styles = StyleSheet.create({
    input: {
      width
    }
  })

  const passwordProps = isPassword ? 
    {
      right: <TextInput.Icon icon="eye" onPress={ ()=> setSecureText(!secureText) }/>,
      secureTextEntry: secureText
    }
    :
    {}

  return (
    <TextInput
      style={ styles.input }
      theme={{ colors: { primary: themeColors.primary, underlineColor:'transparent',}}}
      onChangeText={ handleChange(name) }
      value={ value }
      mode='outlined'
      label={ label }
      {...passwordProps}
    />
  )
}

export default FormInput