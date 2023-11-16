import { FlatList, View } from "react-native"
import CheckListItem from "./TaskItem"

const TaskList = ({ items, selectionList }) => {

  const renderCheckListItem = ({ item }) =>
    <CheckListItem
      item={ item }
      editing={ selectionList.length() > 0 }
      inList={ selectionList.inList(item) }
      addToEdit={ selectionList.add }
      removeFromEdit={ selectionList.remove }
    />
  
  return (
    <View>
      <FlatList
        renderItem={ renderCheckListItem }
        data={ items.sort((item1, item2) => item1.id - item2.id) }
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  )
}

export default TaskList