import { View, StyleSheet, Dimensions } from 'react-native'
import TaskList from './TaskList'
import InputDialog from '../dialogs/InputDialog'
import { useEffect, useState } from 'react'
import ActionButton from 'react-native-action-button'

import Banner from '../main/Banner'
import tasksService from '../../services/tasksService'
import AlertDialog from '../dialogs/AlertDialog'
import useSelectionList from '../../hooks/useSelectionList'
import { colors } from '../../styles/styles'

const CheckList = ({ user }) => {

  const screenHeight = Dimensions.get('window').height

  const styles = StyleSheet.create({
    container: {
      height: screenHeight
    },
    actionButton: {
      marginBottom: 16
    }
  })

  const [tasks, setTasks] = useState([])
  const [dialog, setDialog] = useState(null)
  const selectionList = useSelectionList()

  const showCreateDialog = () => {
    setDialog(<InputDialog title='Nueva tarea' actionName='crear' dismiss={ dismissCreateDialog }/>)
  }

  const showEditDialog = () => {
    const content = selectionList.get(0).content
    setDialog(<InputDialog title='Editar tarea' actionName='editar' initialContent={ content } dismiss={ dismissEditDialog }/>)
  }

  const showDeleteDialog = () => {
    const content = `¿Está seguro que desea elmininar ${ selectionList.length() === 1 ? 'esta entrada' : 'estas entradas' }?`
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

    const editTask = selectionList.get(0)

    // empty edits not allowed
    if (content === '')
      return

    // same content, no further steps required
    if (content === editTask.description)
      return

    try {
      const edited = await tasksService.updateTaskDescription(editTask, content)
      setTasks(tasks.map(task => task.id === edited.id ? edited : task))
      selectionList.clear()
    }
    catch (e) {
      console.error(e)
    }
  }

  const dismissDeleteDialog = async confirmDelete => {
    hideDialog()
    
    if (confirmDelete) {
      try {
        const idsToDelete = selectionList.selectionList.map(task => task.id)
        
        const promises = idsToDelete.map(id => tasksService.deleteTask(id))
        const deleteResult = await Promise.all(promises)
        const deletedIds = idsToDelete.filter((_, index) => deleteResult[index])

        selectionList.clear()
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
    tasksService.getAll()
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