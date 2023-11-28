import React, { useContext, useEffect } from 'react'
import CheckList from '../checklist/CheckList'
import { View } from 'react-native'
import { Route, Routes, Navigate, useNavigate } from 'react-router-native'
import Login from '../users/Login'
import Signup from '../users/SignUp'
import UserContext from '../../contexts/UserContext'
import { retrieveUser } from '../../services/userPersist'

const Main = () => {

  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    console.log('use effect');
    retrieveUser().then(user => {
      if (user && user.info && user.token)
        setUser(user)  
    })
    
  }, [])

  console.log('determine landing view with user:', user);
  console.log('landing view', user ? 'checklist' : 'login');

  const landingView = user
    ? <CheckList />
    : <Login />

  return(
    <View>
      <Routes>
        <Route path="/" element={ landingView } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
