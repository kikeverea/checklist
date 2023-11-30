import usersService from '../services/usersService'
import { useSetUser } from '../contexts/UserContext'
import userLocalPersist from '../services/userLocalPersist'

const useSession = () => {

  const setUser = useSetUser()

  const login = async (credentials) => {
    try {
      const { success, data } = await usersService.loginUser(credentials.username, credentials.password)

      if (success) {
        const user = await userLocalPersist.save(data.user, data.token)

        setUser(user)
        return { success }
      }
      else {
        const error = data
        return { success, error }
      }
    }
    catch (e) {
      console.error(e, e.message)
      return { succes: false, error: e.message }
    }
  }

  const logout = async () => {
    try  {
      await userLocalPersist.remove()
    }
    finally {
      // setUser to 'null' regardless the result of the remove() function; the user will expect to be logged out after this action
      setUser(null)
    }
  }

  return [login, logout]
}

export default useSession