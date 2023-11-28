import { Text, StyleSheet, Pressable } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import useTaskSelection from '../../hooks/useTaskSelection'
import { colors } from '../../styles/styles'

const Tasktask = ({ task, completedStateChange }) => {

  const selectedTasks = useTaskSelection()

  const backgroundColor = selectedTasks.inList(task) ? colors.primaryLight : colors.defaultBackground
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
    if (selectedTasks.length() > 0)
        handleSelect()
  }

  const handleSelect = () => {
    if (selectedTasks.inList(task)) {
      selectedTasks.remove(task)
    }
    else {
      selectedTasks.add(task)
    }
  }

  return (
    <Pressable style={ styles.taskStyle } onPress={ () => handlePress() } onLongPress={ () => handleSelect() }>
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

export default Tasktask
