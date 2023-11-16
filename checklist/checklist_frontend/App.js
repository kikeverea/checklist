import React, { useRef } from 'react'
import { NativeRouter } from 'react-router-native'
import ActionButton from 'react-native-action-button'
import { colors } from './src/styles/styles'

import Main from './src/views/main/Main'

const App = () => {
  const createTaskRef = useRef()

  return (
    <>
      <NativeRouter>
        <Main ref= { createTaskRef }/>
        <ActionButton
          buttonColor={ colors.accent }
          onPress={ () => createTaskRef.current.showCreateDialog() }
        />
      </NativeRouter>
    </>
  ) 
}

export default App;
