import React, { useEffect, useState } from 'react'
import CheckList from '../checklist/CheckList'
import { View } from 'react-native'
import { Route, Routes, Navigate, useNavigate } from 'react-router-native';
import Login from '../users/Login'

const Main = () => {

  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    navigate('login')
  }, [])

  return(
    <View>
      <Routes>
        <Route path="/" element={ <CheckList user={ user }/> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
