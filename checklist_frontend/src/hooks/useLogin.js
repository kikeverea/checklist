import usersService from '../services/usersService'
import { useSetUser } from '../contexts/UserContext'
import { persistUser } from '../services/userPersist'

const useLogin = () => {

  const setUser = useSetUser()

  const loginUser = async (credentials) => {
    try {
      const { success, data } = await usersService.loginUser(credentials.username, credentials.password)

      if (success) {
        const user = await persistUser(data.user, data.token)
        setUser(user)
      }
      else {
        const error = data
        return error
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