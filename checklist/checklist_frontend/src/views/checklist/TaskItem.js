import { Text, StyleSheet, Pressable } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { colors } from '../../styles/styles'

const CheckListItem = ({ item, editing, inList, addToEdit, removeFromEdit }) => {

  const backgroundColor = inList ? colors.primaryLight : colors.defaultBackground

  const handlePress = () => {
    if (editing)
        handleEdit()
  }

  const handleEdit = () => {
    if (inList) 
        removeFromEdit(item)
    
    else 
        addToEdit(item)
  }

  const styles = StyleSheet.create({
    itemStyle: {
      flexDirection: 'row',
      paddingLeft: 16,
      paddingTop: 16,
      paddingRight: 48,
      paddingBottom: 16,
      backgroundColor
    }
  })

  return (
    <Pressable style={ styles.itemStyle } onPress={ () => handlePress() } onLongPress={ () => handleEdit() }>
      <BouncyCheckbox
        isChecked={ item.checked }
        fillColor={ colors.primary }
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: colors.primary }}
      />
      <Text>{ item.description }</Text>
    </Pressable>
  )
}

export default CheckListItem