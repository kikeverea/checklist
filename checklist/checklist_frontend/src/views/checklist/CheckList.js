import { View } from 'react-native'
import CheckListItems from './Tasktems'
import { colors } from '../../styles/styles'
import ActionButton from 'react-native-action-button'
import InputDialog from '../dialogs/InputDialog'
import { useEffect, useState } from 'react'

import Banner from '../main/Banner'
import itemsService from '../../services/itemsService'
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
        const newItem = await itemsService.createItem(content)
        setItems(items.concat(newItem))
      }
      catch (e) {
        console.error('Could not create task')
      }
    }
  }

  const dismissEditDialog = async (content) => {
    hideDialog()

    if (content !== '' && content !== selectionList.get(0).content) {
      try {
        selectionList.get(0).content = content
        await itemsService.updateItem(selectionList.get(0))
        selectionList.clear()
      }
      catch (e) {
        console.error(e)
      }
    }
  }

  const dismissDeleteDialog = async confirmDelete => {
    hideDialog()

    // continue here...

    if (confirmDelete) {
      try {
        const idsToDelete = selectionList.selectionList.map(task => task.id)
        
        const promises = idsToDelete.map(id => itemsService.deleteItem(id))
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
    itemsService.getAll()
      .then(items => setItems(items)) 
  }, [])

  return(
    <View>
      <Banner editCount={ selectionList.length() } onEdit={ showEditDialog } onDelete={ showDeleteDialog }/>
      <CheckListItems items={ items } selectionList={ selectionList }/>
      { dialog }
      <ActionButton
        buttonColor={ colors.accent }
        onPress={ () => showCreateDialog() }
      />
    </View>
  )
}

export default CheckList