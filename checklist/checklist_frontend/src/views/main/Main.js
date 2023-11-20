import React, { useEffect, useState } from 'react'
import CheckList from '../checklist/CheckList'
import { View } from 'react-native'
import { Route, Routes, Navigate, useNavigate } from 'react-router-native';
import Login from '../users/Login'
import Signup from '../users/SignUp'

const Main = () => {

  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    navigate('signup')
  }, [])

  return(
    <View>
      <Routes>
        <Route path="/" element={ <CheckList user={ user }/> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
