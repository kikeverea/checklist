import * as Keychain from 'react-native-keychain'
import AsyncStorage from '@react-native-async-storage/async-storage'

const nameSpace = 'innobing.kikeverea'
const key = `${nameSpace}:user`

export const persistUser = async (userInfo, token) => {
  await Keychain.setGenericPassword('token', token)
  await AsyncStorage.setItem(key, JSON.stringify(userInfo))

  const user = {
    info: { ...user },
    token
  }

  return user
}

export const retrieveUser = async () => {
  const keychain = await Keychain.getGenericPassword()
  const infoJson = await AsyncStorage.getItem(key)
  
  const token = keychain.password
  const info = JSON.parse(infoJson)

  const user = {
    info,
    token
  }

  return user
}