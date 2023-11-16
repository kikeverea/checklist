import axios from "axios"

const url = args => {
  let url = 'http://192.168.64.5:3000/tasks'

  if (args)
    url += '/' + args.join('/')

  return url + '.json'
}

const getAll = async () => {
    const res =  await axios.get(url())
    return res.data
}

const createTask = async (user, description) => {
    const res = await axios.post(url(), { created_by: user.id, description })
    return res.data
}

const updateTaskDescription = async (task, description) => {
    const res = await axios.put(url([task.id]), { description })
    return res.data
}

const deleteTask = async id => {
  const res = await axios.delete(url([id]))
  return res.status === 204
}

export default { getAll, createTask, updateTaskDescription, deleteTask }