import { useContext } from "react"
import SelectedTasksContext from '../contexts/SelectedTasksContext'

const useTaskSelection = () => {
  const [selectedTasks, setSelectedTasks] = useContext(SelectedTasksContext)

  const length = () =>
    selectedTasks.length
  
  const get = index =>
    selectedTasks[index]
  
  const add = task =>
    setSelectedTasks([...selectedTasks, task])
  
  const remove = task =>
    setSelectedTasks(selectedTasks.filter(inList => inList.id !== task.id))
  
  const inList = task =>
    selectedTasks.some(inList => inList.id === task.id)

  const all = () =>
    [...selectedTasks]
  
  const clear = () =>
    setSelectedTasks([])

  return { all, get, add, remove, inList, clear, length }
}

export default useTaskSelection