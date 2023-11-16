import axios from "axios"

const url = args => {
  const url = 'http://192.168.64.5:3000/tasks'

  if (args)
    url + '/' + args.join('/')

  return url + '.json'
}

const getAll = async () => {
    const res =  await axios.get(url())
    return res.data
}

const createItem = async (description) => {
    const res = await axios.post(url(), { description })
    return res.data
}

const updateItem = async (item) => {
    deleteItem(item)
    items.push(item)
}

const deleteItem = async id => {
  const res = await axios.delete(url(id))
  return res.status === 204
}

export default { getAll, createItem, updateItem, deleteItem }