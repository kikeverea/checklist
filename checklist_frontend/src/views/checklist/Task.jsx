import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useTasksFilter } from '../../contexts/TasksContext'
import { useParams } from 'react-router-native'
import TaskActionBar from './TaskActionBar'
import TaskDescription from './TaskDescription'
import TaskOwners from './TaskOwners'

const Task = () => {

  const screenHeight = Dimensions.get('window').height
  const sectionsHeight = screenHeight / 5 * 2
  
  const styles = StyleSheet.create({
    container: {
      padding: 16
    }
  })

  const filterTask = useTasksFilter()
  const params = useParams()

  const task = filterTask(parseInt(params.id))

  return (
    <View>
      <TaskActionBar task={ task }>
        <Text>
          Tarea
        </Text>
      </TaskActionBar>
      <View style={ styles.container }>
        <TaskDescription description={ task.description } height={ sectionsHeight }/>
        <TaskOwners height={ sectionsHeight }/>
      </View>
    </View>
  )
}

export default Task