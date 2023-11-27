import React from 'react'
import { NativeRouter } from 'react-router-native'
import Toast from 'react-native-toast-message'

import Main from './src/views/main/Main'
import { UserContextProvider } from './src/contexts/UserContext'

const App = () => {

  return (
    <>
      <NativeRouter>
        <UserContextProvider>
          <Main/>
        </UserContextProvider>
      </NativeRouter>
      <Toast />
    </>
  ) 
}

export default App;
