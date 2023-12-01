import usersService from '../services/usersService'
import { useSetUser } from '../contexts/UserContext'
import userLocalPersist from '../services/userLocalPersist'

const useUserAccount = () => {

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
        return { success, error: data.error }
      }
    }
    catch (e) {
      console.error(e, e.message)
      return { succes: false, error: e.message }
    }
  }

  const logout = async () => {
    try {
      await userLocalPersist.remove()
    }
    finally {
      // setUser to 'null' regardless the result of the remove() function; the user will expect to be logged out after this action
      setUser(null)
    }
  }

  const deleteAccout = async user => {
    await logout()
    await usersService.deleteUser(user)
  }

  return [login, logout, deleteAccout]
}

export default useUserAccount