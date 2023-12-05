import { StyleSheet, View, TextInput } from 'react-native'
import { colors } from '../../styles/styles'
import { useState } from 'react'

const InputBar = () => {

  const styles = StyleSheet.create({
    bar: {
      flex: 1,
      height: 40,
      flexDirection: 'row',
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
    </View>
  )
}

export default InputBar