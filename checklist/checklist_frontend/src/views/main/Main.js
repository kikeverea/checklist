import React, { forwardRef, useRef } from 'react'
import CheckList from '../checklist/CheckList'
import { View } from 'react-native'

const Main = forwardRef((_, ref) => {

  const user = {
    id: 1
  }

  return(
    <View style={{ paddingBottom: 96 }}>
      <CheckList user={ user } ref={ ref }/>
    </View>
  )
})

export default Main
