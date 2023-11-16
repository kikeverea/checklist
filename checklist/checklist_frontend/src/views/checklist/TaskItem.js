import { Text, StyleSheet, Pressable } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { colors } from '../../styles/styles'

const TaskItem = ({ task, completedStateChange, editing, inList, addToEdit, removeFromEdit }) => {

  const backgroundColor = inList ? colors.primaryLight : colors.defaultBackground
  const checkboxColor = task.completed ? colors.primaryLight : colors.primary
  const paddingLeft =  task.completed ? 32 : 16

  const styles = StyleSheet.create({
    taskStyle: {
      flexDirection: 'row',
      paddingLeft,
      paddingTop: 16,
      paddingRight: 48,
      paddingBottom: 16,
      backgroundColor
    }
  })

  const handlePress = () => {
    if (editing)
        handleEdit()
  }

  const handleEdit = () => {
    if (inList) 
        removeFromEdit(task)
    
    else 
        addToEdit(task)
  }

  return (
    <Pressable style={ styles.taskStyle } onPress={ () => handlePress() } onLongPress={ () => handleEdit() }>
      <BouncyCheckbox
        isChecked={ task.completed }
        onPress={() => { completedStateChange(task, !task.completed) }}
        fillColor={ checkboxColor }
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: colors.primary }}
      />
      <Text>{ task.description }</Text>
    </Pressable>
  )
}

export default TaskItem