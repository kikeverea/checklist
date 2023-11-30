import * as Keychain from 'react-native-keychain'
import AsyncStorage from '@react-native-async-storage/async-storage'

const nameSpace = 'innobing.kikeverea'
const key = `${nameSpace}:user`

const save = async (userInfo, token) => {
  await Keychain.setGenericPassword('token', token)
  await AsyncStorage.setItem(key, JSON.stringify(userInfo))

  const user = {
    info: { ...userInfo },
    token
  }

  return user
}

const remove = async () => {
  await AsyncStorage.removeItem(key)

  const tokenRemoved = await Keychain.resetGenericPassword()
  const userRemoved = await AsyncStorage.getItem(key) === null

  return tokenRemoved && userRemoved
}

const get = async () => {
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

export default { save, remove, get }