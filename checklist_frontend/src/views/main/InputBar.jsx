import { StyleSheet, View, TextInput } from 'react-native'
import { colors } from '../../styles/styles'
import { useState } from 'react'
import IconButton from './IconButton'
import Roundshape from './Roundshape'

const InputBar = () => {

  const styles = StyleSheet.create({
    bar: {
      flex: 1,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 20,
      borderColor: colors.secondary,
      borderWidth: 1,
      paddingHorizontal: 16
    },
    input: {
      flex: 1,
      fontSize: 12
    }
  })

  const focusedPlaceholder = 'usuario, email, id'
  const notFocusedPlaceholder = 'Compartir tarea'

  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState(notFocusedPlaceholder)

  return (
    <View style={ styles.bar }>
      <TextInput
        style={ styles.input }
        onChangeText={ value => setValue(value) }
        value={ value }
        placeholder={ placeholder }
        onFocus={ () => setPlaceholder(focusedPlaceholder) }
        onBlur={() => setPlaceholder(notFocusedPlaceholder) }
      />
      <Roundshape size={ 20 } color={ colors.primary } asButton={{ disabled: false, action: () => console.log('pressed') }}>
        <IconButton name='check' color={ colors.icons } size={ 16 } />
      </Roundshape>
    </View>
  )
}

export default InputBar