import React, { useContext, useEffect } from 'react'
import CheckList from '../checklist/CheckList'
import User from '../users/User'
import { View, Platform, BackHandler, Alert } from 'react-native'
import { Route, Routes, Navigate, useNavigate } from 'react-router-native'
import Login from '../users/Login'
import Signup from '../users/SignUp'
import Task from '../checklist/Task'
import UserContext from '../../contexts/UserContext'
import userLocalPersist from '../../services/userLocalPersist'
import { useBackHandler } from '@react-native-community/hooks'
import { useLocation } from 'react-router-native'

const Main = () => {

  const [user, setUser] = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  useBackHandler(() => {
    // Handle event only for android OS; this handling code uses react native´s BackHandler,
    // which only works with android

    if (Platform.OS !== 'android') 
      return false

    if (location.pathname === '/signup' || location.pathname === '/user') {
      navigate(-1)
    }
    else {
      launchExitAlert()
    }
    return true
  })

  const launchExitAlert = () =>
    Alert.alert('Salir', '¿Deseas salir de la aplicación?', [
      {
        text: 'Cancelar',
        onPress: () => {}, // do nothing
        style: 'cancel',
      },
      {
        text: 'Salir',
        onPress: () => BackHandler.exitApp()
      }
    ]);

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

  return(
    <View>
      <Routes>
        <Route path="/" element={ landingView } />
        <Route path="/task/:id" element={ <Task /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/user" element={ <User /> } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
