import axios from "axios"

const url = id => {
  let url = 'http://192.168.64.5:3000/tasks'

  if (id)
    url += '/' + id

  return url + '.json'
}

const auth = token => {
  return ({ headers: { Authorization: `Bearer ${token}` } })
}

const getAll = async (user) => {
    const res =  await axios.get(url(), auth(user.token))
    return res.data
}

const createTask = async (user, description) => {
    const res = await axios.post(url(), { description }, auth(user.token))
    return res.data
}

const updateCompletedState = async (user, task) =>
  await updateTask(user, task, { completed: task.completed })

const updateTaskDescription = async (user, task, description) =>
  await updateTask(user, task, { description })

const updateTask = async (user, task, updateContent) => {
  const res = await axios.put(url(task.id), updateContent, auth(user.token))
  return res.data
}

const deleteTask = async (user, task) => {
  const res = await axios.delete(url(task.id), auth(user.token))
  return res.status === 204
}

export default { getAll, createTask, updateTaskDescription, updateCompletedState, deleteTask }