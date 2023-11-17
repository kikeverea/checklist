import React from 'react'
import CheckList from '../checklist/CheckList'
import { View } from 'react-native'
import Login from '../users/Login'
import ActionButton from 'react-native-action-button'
import { colors } from '../../styles/styles'

const Main = () => {

  /*const user = {
    id: 1
  }*/

  const user = {
    id: 1
  }

  return(
    <View style={{ paddingBottom: 96 }}>
      {
        user
          ? <>
              <CheckList user={ user }/>
            </>
          : <Login />
      }
    </View>
  )
}

export default Main
