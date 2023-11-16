import { FlatList, View } from "react-native"
import TaskItem from "./TaskItem"

const TaskList = ({ tasks, selectionList }) => {

  const renderTaskItem = ({ task }) =>
    <TaskItem
      task={ task }
      editing={ selectionList.length() > 0 }
      inList={ selectionList.inList(task) }
      addToEdit={ selectionList.add }
      removeFromEdit={ selectionList.remove }
    />
  
  return (
    <View>
      <FlatList
        renderItem={ renderTaskItem }
        data={ tasks.sort((task1, task2) => task1.id - task2.id) }
        keyExtractor={(task) => task.id}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  )
}

export default TaskList