import { View, Dimensions, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { useTasksFilter } from '../../contexts/TasksContext'
import { useParams } from 'react-router-native'
import TaskActionBar from './TaskActionBar'
import TaskDescription from './TaskDescription'
import TaskOwners from './TaskOwners'
import { useState, useEffect } from 'react'

const Task = () => {

  const screenHeight = Dimensions.get('window').height
  const actionBarHeight = 60

  const displayHeight = screenHeight - actionBarHeight
  const sectionHeight = displayHeight / 2

  const styles = StyleSheet.create({
    container: {
      height: screenHeight,
      alignContent: 'space-between'
    },
    section: {
      height: keyboardOnDisplay ? screenHeight : sectionHeight
    }
  })

  const [keyboardOnDisplay, setKeyboardOnDisplay] = useState(false)
  const filterTask = useTasksFilter()
  const params = useParams()

  useEffect(() => {
    // listen for keyboard events

    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOnDisplay(true)
    })

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOnDisplay(false)
    })

    return () => {
      // remove keyboard event listeners
      keyboardShowListener.remove()
      keyboardHideListener.remove()
    }
  }, [])

  const task = filterTask(parseInt(params.id))

  return (
    <TouchableWithoutFeedback onPress={ ()=> Keyboard.dismiss() }>
      <View style={ styles.container }>
        <TaskActionBar height={ actionBarHeight } task={ task } show={ !keyboardOnDisplay }/>
        <TaskDescription style={ styles.section } description={ task.description } show={ !keyboardOnDisplay }/>
        <TaskOwners style={ styles.section } owners= { task.users } />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Task