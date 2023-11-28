import { createContext, useState } from 'react'

const SelectedTasksContext = createContext({
  selectedTasks: [],
  setSelectedTasks: () => {},
})

export const SelectedTasksContextProvider = ({ children }) => {
  const [selectedTasks, setSelectedTasks] = useState([])

  return (
    <SelectedTasksContext.Provider value={[selectedTasks, setSelectedTasks] }>
      { children }
    </SelectedTasksContext.Provider>
  )
}

export default SelectedTasksContext