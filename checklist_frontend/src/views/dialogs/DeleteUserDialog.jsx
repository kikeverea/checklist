import Dialog from 'react-native-dialog'
import { useState, useEffect } from 'react'
import { colors } from '../../styles/styles'

const DeleteUserDialog = ({ dismiss }) => {
  
  const [timeLeft, setTimeLeft] = useState(5)

  // timer
  useEffect(() => {
    setTimeout(() => {
      const time = timeLeft - 1

      if (time >= 0)
        setTimeLeft(timeLeft - 1) 
    },
    1000)
  },
  [timeLeft])

  const deleteColor = timeLeft > 0 ? '#CC6666' : colors.critical
  const disabled = timeLeft > 0

  return (
    <Dialog.Container visible={ true }>
      <Dialog.Title>Eliminar Cuenta</Dialog.Title>
      <Dialog.Description>Esta operación NO es reversible. ¿Deseas continuar?</Dialog.Description>
      <Dialog.Button
        label="Cancelar"
        onPress={() => dismiss(false)}
      />
      <Dialog.Button
        disabled={ disabled }
        color={ deleteColor }
        label={ `Eliminar${ timeLeft > 0 ? '(' + timeLeft + ')' : '' }` }
        onPress={() => dismiss(true)}
      />
    </Dialog.Container>
    )
}

export default DeleteUserDialog