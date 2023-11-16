import { View } from 'react-native'
import TaskList from './TaskList'
import { colors } from '../../styles/styles'
import ActionButton from 'react-native-action-button'
import InputDialog from '../dialogs/InputDialog'
import { useEffect, useState } from 'react'

import Banner from '../main/Banner'
import tasksService from '../../services/tasksService'
import AlertDialog from '../dialogs/AlertDialog'
import useSelectionList from '../../hooks/useSelectionList'

const CheckList = () => {

  const [items, setItems] = useState([])
  const [dialog, setDialog] = useState(null)
  const selectionList = useSelectionList()

  const showCreateDialog = () => {
    setDialog(<InputDialog title='Nueva entrada' actionName='crear' dismiss={ dismissCreateDialog }/>)
  }

  const showEditDialog = () => {
    const content = selectionList.get(0).content
    setDialog(<InputDialog title='Editar entrada' actionName='editar' initialContent={ content } dismiss={ dismissEditDialog }/>)
  }

  const showDeleteDialog = () => {
    const content = `¿Está seguro que desea elmininar ${ selectionList.length() === 1 ? 'esta entrada' : 'estas entradas' }?`
    setDialog(<AlertDialog title='New item' content={ content } dismiss={ dismissDeleteDialog }/>)
  }

  const dismissCreateDialog = async (content) => {
    hideDialog()

    if (content) {
      try {
        const newItem = await tasksService.createItem(content)
        setItems(items.concat(newItem))
      }
      catch (e) {
        console.error('Could not create task')
      }
    }
  }

  const dismissEditDialog = async (content) => {
    hideDialog()

    const editTask = selectionList.get(0)

    // empty edits not allowed
    if (content === '')
      return

    // same content, no further steps required
    if (content === editTask.content)
      return

    try {
      editTask.content = content
      await tasksService.updateItem(editTask)
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
        
        const promises = idsToDelete.map(id => tasksService.deleteItem(id))
        const deleteSucceeded = await Promise.all(promises)
        
        selectionList.clear()
        setItems(items.filter((task, index) => deleteSucceeded[index] && task.id !== idsToDelete[index]))
      }
      catch (e) {
        console.error(e)
      }
    }
  }

  const hideDialog = () =>
    setDialog(null)


  useEffect(() => {
    tasksService.getAll()
      .then(items => setItems(items)) 
  }, [])

  return(
    <View>
      <Banner editCount={ selectionList.length() } onEdit={ showEditDialog } onDelete={ showDeleteDialog }/>
      <TaskList items={ items } selectionList={ selectionList }/>
      { dialog }
      <ActionButton
        buttonColor={ colors.accent }
        onPress={ () => showCreateDialog() }
      />
    </View>
  )
}

export default CheckList