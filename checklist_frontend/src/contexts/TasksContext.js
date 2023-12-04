import { createContext, useState, useContext } from 'react'

const TasksContext = createContext()

export const useTasksFilter = () => {
  const taskFilter = useContext(TasksContext)
  return taskFilter[2] // [tasks, setTasks, filterTasks]
}

export const TasksContextProvider = ({ children }) => {
  
  const [tasks, setTasks] = useState([])

  const filterTasks = (id) => {
    const result = tasks.filter(task =>task.id === id)
    return result.length > 0 ? result[0] : undefined
  }

  return (
    <TasksContext.Provider value={[tasks, setTasks, filterTasks] }>
      { children }
    </TasksContext.Provider>
  )
}

export default TasksContext