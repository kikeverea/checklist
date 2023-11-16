import { View, Text } from 'react-native'
import TaskItem from './TaskItem'
import { StyleSheet } from 'react-native'
import { SectionList } from 'react-native'
import { colors } from '../../styles/styles'

const TaskList = ({ tasks, onTaskCompletedChange, selectionList }) => {

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
      editing={ selectionList.length() > 0 }
      inList={ selectionList.inList(item) }
      addToEdit={ selectionList.add }
      removeFromEdit={ selectionList.remove }
    />

  const sectioned = tasks.reduce(
    (result, task) => {
      const sectionIndex = task.completed ? 1 : 0
      result[sectionIndex].data = result[sectionIndex].data
        .concat(task)
        .sort((task1, task2) => task1.id - task2.id)
      return result
    },
    [{ title: NO_TITLE, data: []}, { title: COMPLETED_TASKS_TITLE, data: []}]
  )

  const renderSectionHeader = title =>
    <>
      {
        title !== NO_TITLE && title === COMPLETED_TASKS_TITLE && sectioned[1].data.length > 0 &&
        <View style={ styles.header }>
          <Text style={ styles.title }>{ title }</Text>
        </View>
      }
    </>
  
  return (
    <View>
      <SectionList
        renderItem={ renderTaskItem }
        sections={ sectioned }
        keyExtractor={(task) => task.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderSectionHeader={({section: {title}}) => renderSectionHeader(title)}
        ItemSeparatorComponent={ renderItemSeparator }
      />      
    </View>
  )
}

export default TaskList