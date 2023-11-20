const userService = () => {
  const url = 'http://192.168.64.5:3000/users'

  const createNewUser = async (user) => {
    const res = await axios.post(url, user)
    return res.data
  }
}

export default { createNewUser }