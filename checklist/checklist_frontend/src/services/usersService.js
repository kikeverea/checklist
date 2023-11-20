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

export default { createNewUser }