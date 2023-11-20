import React from 'react'
import { NativeRouter } from 'react-router-native'
import Toast from 'react-native-toast-message'

import Main from './src/views/main/Main'

const App = () => {

  return (
    <>
      <NativeRouter>
        <Main/>
      </NativeRouter>
      <Toast />
    </>
  ) 
}

export default App;
