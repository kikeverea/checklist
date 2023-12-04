import { useContext, useEffect, useState } from 'react'
import usersService from '../services/usersService'
import UserContext from '../contexts/UserContext'

const useUserQuery = (userId) => {

  const [loggedUser] = useContext(UserContext)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    usersService
      .getUser(userId, loggedUser.token)
      .then(user => {
        setUser(user)
        setLoading(false)
      })
  }, [])

  return [user, loading]
}

export default useUserQuery