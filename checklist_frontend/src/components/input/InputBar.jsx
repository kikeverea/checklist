import { StyleSheet, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../../styles/styles'
import { useState } from 'react'
import Roundshape from './Roundshape'

const InputBar = ({ onSubmit }) => {

  const styles = StyleSheet.create({
    bar: {
      flex: 1,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 20,
      borderColor: colors.secondary,
      borderWidth: 1,
      paddingHorizontal: 8
    },
    input: {
      flex: 1,
      fontSize: 12
    }
  })

  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState(unfocusedPlaceholder)

  const enableButton = value.length > 2
  const buttonColor = enableButton ? '#67d68c' : colors.secondary
  const buttonAction = enableButton ? onSubmit : () => {}

  const focusedPlaceholder = 'usuario, email, id'
  const unfocusedPlaceholder = 'Compartir tarea'

  return (
    <View style={ styles.bar }>
      <TextInput
        style={ styles.input }
        onChangeText={ value => setValue(value) }
        value={ value }
        placeholder={ placeholder }
        onFocus={ () => setPlaceholder(focusedPlaceholder) }
        onBlur={() => setPlaceholder(unfocusedPlaceholder) }
      />
      <Roundshape
        content={ <Icon name='check' size={ 12 } /> }
        color={ buttonColor }
        doAction={ buttonAction }
      />
    </View>
  )
}

export default InputBar