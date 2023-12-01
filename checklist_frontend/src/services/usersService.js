import axios from "axios"

const url = 'http://192.168.64.5:3000/users.json'

const me = async user => {
  const url = `http://192.168.64.5:3000/users/${user.info.id}`
  const res = await axios.get(url, { headers: { Authorization: `Bearer ${user.token}` } })

  return res.data
}

const createNewUser = async (values) => {
  const user = {
    user: {
      ...values,
      password_confirmation: values.confirmPassword
    }
  }
  delete user.user.confirmPassword
  
  let success
  let data

  try {
    const res = await axios.post(url, user)
    success = res.status === 201
    data = res.data
  }
  catch (e) {
    success = false
    data = e.response.data
  }

  return { success, data }
}

const loginUser = async (username, password) => {
  let success
  let data

  try {
    const res = await axios.post('http://192.168.64.5:3000/auth', { username, password })

    if (res.status === 202) {
      if (!res.data.token) {
        success = false
        data = { error: 'Missing token' }
      }
      else if (!res.data.user) {
        success = false
        data = { error: 'Missing user info' }
      }
      else {
        success = true
        data = res.data
      }
    }
  }
  catch (e) {
    const res = e.response
    success = false

    if (res.status === 401)
      data = { error: 'Wrong credentials'}

    else
      data = { error: `Failed with status code: ${res.status}`}
  }
  return { success, data }
}

const deleteUser = async user => {
  const url = `http://192.168.64.5:3000/users/${user.info.id}`
  await axios.delete(url, { headers: { Authorization: `Bearer ${user.token}` } })
}

export default { me, createNewUser, loginUser, deleteUser }
