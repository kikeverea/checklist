import { View, StyleSheet, Dimensions } from 'react-native'
import TaskList from './TaskList'
import InputDialog from '../dialogs/InputDialog'
import { useContext, useEffect, useState } from 'react'
import ActionButton from 'react-native-action-button'

import Banner from '../main/Banner'
import tasksService from '../../services/tasksService'
import AlertDialog from '../dialogs/AlertDialog'
import useTaskSelection from '../../hooks/useTaskSelection'
import { colors } from '../../styles/styles'
import UserContext from '../../contexts/UserContext'

const CheckList = () => {

  const screenHeight = Dimensions.get('window').height

  const styles = StyleSheet.create({
    container: {
      height: screenHeight,
      paddingBottom: 96
    },
    actionButton: {
      marginBottom: 16
    }
  })

  const [tasks, setTasks] = useState([])
  const [dialog, setDialog] = useState(null)
  const selectedTasks = useTaskSelection()
  const [user, setUser] = useContext(UserContext)

  const showCreateDialog = () => {
    setDialog(<InputDialog title='Nueva tarea' actionName='crear' dismiss={ dismissCreateDialog }/>)
  }

  const showEditDialog = () => {
    const content = selectedTasks.get(0).content
    setDialog(<InputDialog title='Editar tarea' actionName='editar' initialContent={ content } dismiss={ dismissEditDialog }/>)
  }

  const showDeleteDialog = () => {
    const content = `¿Está seguro que desea elmininar ${ selectedTasks.length() === 1 ? 'esta entrada' : 'estas entradas' }?`
    setDialog(<AlertDialog title='Eliminar tarea' content={ content } dismiss={ dismissDeleteDialog }/>)
  }

  const dismissCreateDialog = async (content) => {
    hideDialog()

    if (content) {
      try {
        const newTask = await tasksService.createTask(user, content)
        setTasks(tasks.concat(newTask))
      }
      catch (e) {
        console.error('Could not create task')
      }
    }
  }

  const dismissEditDialog = async content => {
    hideDialog()

    const editTask = selectedTasks.get(0)

    // empty edits not allowed
    if (content === '')
      return

    // same content, no further steps required
    if (content === editTask.description)
      return

    try {
      const edited = await tasksService.updateTaskDescription(user, editTask, content)
      setTasks(tasks.map(task => task.id === edited.id ? edited : task))
      selectedTasks.clear()
    }
    catch (e) {
      console.error(e)
    }
  }

  const dismissDeleteDialog = async confirmDelete => {
    hideDialog()
    
    if (confirmDelete) {
      try {
        const idsToDelete = selectedTasks.ids
        
        const promises = idsToDelete.map(id => tasksService.deleteTask(id))
        const deleteResult = await Promise.all(promises)
        const deletedIds = idsToDelete.filter((_, index) => deleteResult[index])

        selectedTasks.clear()
        setTasks(tasks.filter(task => !deletedIds.includes(task.id)))
      }
      catch (e) {
        console.error(e)
      }
    }
  }

  const onTaskCompletedChange = async (task, completed) => {
    task.completed = completed
    const updated = await tasksService.updateCompletedState(user, task)
    setTasks(tasks.map(task => task.id === updated.id ? updated : task))
  }

  const hideDialog = () =>
    setDialog(null)


  useEffect(() => {
    tasksService.getAll(user)
      .then(tasks => {
        setTasks(tasks)
      })
      .catch(e => console.error(e))
  }, [])

  return(
    <>
      <View style={ styles.container }>
        <Banner editCount={ selectionList.length() } onEdit={ showEditDialog } onDelete={ showDeleteDialog }/>
        <TaskList tasks={ tasks } onTaskCompletedChange={ onTaskCompletedChange } selectionList={ selectionList }/>
        { dialog }
        <ActionButton
          style={ styles.actionButton }
          buttonColor={ colors.accent }
          onPress={ () => showCreateDialog() } 
        />
      </View>
      
    </>
  )
}

export default CheckList