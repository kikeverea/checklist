import Dialog from 'react-native-dialog'

const AlertDialog = ({ title, content, dismiss }) => {
    
  const dismissDialog = (content) =>
    dismiss(content)

  return (
    <Dialog.Container visible={ true }>
      <Dialog.Title>{ title }</Dialog.Title>
      <Dialog.Description>{ content }</Dialog.Description>
      <Dialog.Button label="Cancel" onPress={() => dismissDialog(false)} />
      <Dialog.Button label="Eliminar" onPress={() => dismissDialog(true)}/>
    </Dialog.Container>
    )
}

export default AlertDialog