import React from 'react'
import { NativeRouter } from 'react-router-native'
import Toast from 'react-native-toast-message'

import Main from './src/views/main/Main'
import { UserContextProvider } from './src/contexts/UserContext'
import { SelectedTasksContextProvider } from './src/contexts/SelectedTasksContext'
import { TasksContextProvider } from './src/contexts/TasksContext'

const App = () => {

  return (
    <>
      <NativeRouter>
        <UserContextProvider>
          <TasksContextProvider>
            <SelectedTasksContextProvider>
              <Main/>
            </SelectedTasksContextProvider>
          </TasksContextProvider>
        </UserContextProvider>
      </NativeRouter>
      <Toast />
    </>
  ) 
}

export default App
