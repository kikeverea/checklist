import { useState } from 'react'
import usersService from '../services/usersService'
import useUserSession from '../hooks/useUserSession'

const useUserQuery = () => {

  const [currentUser] = useUserSession() // needed for token
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const query = async ({ id, username, email }) => {
    try {
      const user = await usersService.queryUser({ id, username, email }, currentUser.token)
      setUser(user)
      setLoading(false)
    }
    catch (e) {
      if (e.response)
        handleErrorResponse(e.response)
      else
        setDefaultError()
    }
  }

  const handleErrorResponse = (response) => {
    const status = response.status

    if (status === 404)
      setError(`El usuario ${username ? username : email ? email : id} no existe`)

    else if (status >= 400 && status > 500)
      setError('Error: no se puede acceder al usuario')

    else if (status >= 500 && status > 600)
      setError('Error: no se ha obtenido respuesta')

    else
      setDefaultError()
  }

  const setDefaultError = () =>
    setError(`Error al buscar usuario ${username ? username : email ? email : id}`)

  return [query, user, loading, error]
}

export default useUserQuery