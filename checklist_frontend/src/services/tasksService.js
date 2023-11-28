import axios from "axios"

const url = id => {
  let url = 'http://192.168.64.5:3000/tasks'

  if (id)
    url += '/' + id

  return url + '.json'
}

const config = token => {
  return ({ headers: { Authorization: `Bearer ${token}` } })
}

const getAll = async (user) => {
    const res =  await axios.get(url(), config(user.token))
    return res.data
}

const createTask = async (user, description) => {
    const res = await axios.post(url(), { created_by: user.id, description })
    return res.data
}

const updateCompletedState = async (user, task) => {
  return await updateTask(task, { udpated_by: user.id, completed: task.completed })
}

const updateTaskDescription = async (user, task, description) => {
  return await updateTask(task, { udpated_by: user.id, description })
}

const updateTask = async (task, updateContent) => {
  const res = await axios.put(url(task.id), updateContent)
  return res.data
}

const deleteTask = async id => {
  const res = await axios.delete(url(id))
  return res.status === 204
}

export default { getAll, createTask, updateTaskDescription, updateCompletedState, deleteTask }