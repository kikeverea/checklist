import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const useSetUser = () => {
  const userContext = useContext(UserContext) // [user, setUser]
  return userContext[1]
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