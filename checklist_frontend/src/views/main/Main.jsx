import React, { useContext, useEffect } from 'react'
import CheckList from '../checklist/CheckList'
import User from '../users/User'
import { View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import Login from '../users/Login'
import Signup from '../users/SignUp'
import UserContext from '../../contexts/UserContext'
import userLocalPersist from '../../services/userLocalPersist'

const Main = () => {

  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    userLocalPersist.get()
      .then(user => {
        if (user && user.info && user.token)
          setUser(user)  
      })
      .catch(e => console.error(e))
  }, [])

  const landingView = user
    ? <CheckList />
    : <Login />

  //const landingView = <User user={ user.info }/> 

  return(
    <View>
      <Routes>
        <Route path="/" element={ landingView } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/user" element={ <User /> } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
