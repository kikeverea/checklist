import { createContext, useContext, useState } from 'react'

const UserContext = createContext({
  user: '',
  setUser: () => {},
})

const getSetUser = () => {
  const userContext = useContext(UserContext) // [user, setUser]
  return userContext[1]
}

export const useLogin = () =>
  getSetUser()

export const useLogout = () => {
  const setUser = getSetUser()
  return ()=> setUser(null)
}

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={[user, setUser] }>
      { children }
    </UserContext.Provider>
  )
}

export default UserContext