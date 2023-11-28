import usersService from '../services/usersService'
import { useSetUser } from '../contexts/UserContext'

const useLogin = () => {

  const setUser = useSetUser()

  const loginUser = async (credentials) => {
    try {
      const { success, data } = await usersService.loginUser(credentials.username, credentials.password)
      
      if (success) {
        if (!data.token)
          return { message: 'Missing token' }
  
        if (!data.user)
          return { message: 'Missing ser info' }

        setUser(data)
      }
      else {
        return { message: 'Wrong credentials' }
      }
    }
    catch (e) {
      console.error(e, e.message)
      return { message: e.message }
    }
  }

  return loginUser
}

export default useLogin