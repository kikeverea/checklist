import { useState } from 'react'
import Dialog from 'react-native-dialog'

const InputDialog = ({ title, initialContent = '', actionName, dismiss }) => {
    
  const [content, setContent] = useState(initialContent)
  
  const dismissDialog = (content) => {
    setContent('')
    dismiss(content)
  }

  return (
    <Dialog.Container visible={ true }>
      <Dialog.Title>{ title }</Dialog.Title>
      <Dialog.Input value={ content } onChangeText={ text => setContent(text)}/>
      <Dialog.Button label="Cancel" onPress={() => dismissDialog()} />
      <Dialog.Button label={ actionName } onPress={() => dismissDialog(content)}/>
    </Dialog.Container>
  )
}

export default InputDialog