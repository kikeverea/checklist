import axios from "axios"

const url = 'http://192.168.64.5:3000/users.json'

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
    else if (res.status === 401) {
      success = false
      data = { error: 'Wrong credentials'}
    }
    else {
      success = false
      data = { error: `Failed with status code: ${res.status}`}
    }
  }
  catch (e) {
    success = false
    data = e.response.data
  }
  return { success, data }
}

export default { createNewUser, loginUser }