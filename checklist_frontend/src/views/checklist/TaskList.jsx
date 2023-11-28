import { View } from 'react-native'
import TaskItem from './TaskItem'
import { StyleSheet } from 'react-native'
import { SectionList } from 'react-native'
import { colors } from '../../styles/styles'

const TaskList = ({ tasks, onTaskCompletedChange }) => {

  const PENDING_TASKS_INDEX = 0
  const COMPLETED_TASKS_INDEX = 1

  const COMPLETED_TASKS_TITLE = 'Completadas'
  const NO_TITLE = 'no_title'

  const styles = StyleSheet.create({
    separator: {
      height: 3
    },
    header: {
      padding: 8,
      backgroundColor: colors.primaryLight
    },
    title: {
      color: colors.icons,
      fontWeight: 'bold'
    }
  })

  const renderItemSeparator = () => <View style={ styles.separator }/>

  const renderTaskItem = ({ item }) =>
    <TaskItem
      task={ item }
      completedStateChange={ onTaskCompletedChange }
    />

  const sectioned = 
    tasks.reduce(
      (sectionedList, task) => {
        const sectionIndex = task.completed ? COMPLETED_TASKS_INDEX : PENDING_TASKS_INDEX
        const section = sectionedList[sectionIndex].data
        
        const updatedSection = section
          .concat(task)                                 
          .sort((task1, task2) => task1.id - task2.id)

        sectionedList[sectionIndex].data = updatedSection
        return sectionedList
      },
      [{ title: NO_TITLE, data: []}, { title: COMPLETED_TASKS_TITLE, data: []}]
    )

  return (
    <View>
      <SectionList
        renderItem={ renderTaskItem }
        sections={ sectioned }
        keyExtractor={(task) => task.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderSectionHeader={({section: {title}}) => renderItemSeparator}
        ItemSeparatorComponent={ renderItemSeparator }
      />      
    </View>
  )
}

export default TaskList