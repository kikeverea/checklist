import { Text, StyleSheet, Pressable } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { colors } from '../../styles/styles'

const TaskItem = ({ task, editing, inList, addToEdit, removeFromEdit }) => {

  const backgroundColor = inList ? colors.primaryLight : colors.defaultBackground

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

  const styles = StyleSheet.create({
    taskStyle: {
      flexDirection: 'row',
      paddingLeft: 16,
      paddingTop: 16,
      paddingRight: 48,
      paddingBottom: 16,
      backgroundColor
    }
  })

  return (
    <Pressable style={ styles.taskStyle } onPress={ () => handlePress() } onLongPress={ () => handleEdit() }>
      <BouncyCheckbox
        isChecked={ task.completed }
        fillColor={ colors.primary }
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: colors.primary }}
      />
      <Text>{ task.description }</Text>
    </Pressable>
  )
}

export default TaskItem