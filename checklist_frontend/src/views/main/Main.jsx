import React from 'react'
import CheckList from '../checklist/CheckList'
import User from '../users/User'
import { View, Platform, BackHandler, Alert } from 'react-native'
import { Route, Routes, Navigate, useNavigate } from 'react-router-native'
import Login from '../users/Login'
import Signup from '../users/SignUp'
import Task from '../checklist/Task'
import { useBackHandler } from '@react-native-community/hooks'
import { useLocation } from 'react-router-native'
import useUserSession from '../../hooks/useUserSession'

const Main = () => {

  const [user] = useUserSession()
  const navigate = useNavigate()
  const location = useLocation()

  useBackHandler(() => {
    // Handle event only for android OS; this handling code uses react native´s BackHandler,
    // which only works with android
    if (Platform.OS !== 'android') 
      return false

    if (location.pathname === '/') {
      launchExitAlert()
    }
    else {
      navigate(-1)
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
