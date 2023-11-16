import { View, Text, StyleSheet, Pressable } from 'react-native'
import { colors } from '../../styles/styles'

const Banner = ({ editCount, onEdit, onDelete }) => {

  const tilteAlign = editCount > 0 ? 'left' : 'center'

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.primaryDark,
      padding: 16,
        
    },
    editPane: {
      flexDirection: 'row',
      gap: 16
    },
    text: {
      color: colors.icons,
      fontWeight: 'bold'
    },
    title: {
      flexGrow: 1,
      textAlign: tilteAlign
    }
  })

  const editPane = () => {
    return (
      <View style={ styles.editPane }>
          { editCount === 1 && editButton() }
          { editCount >= 1 && deleteButton() }
      </View>
    )
  }

  const editButton = () =>
    <Pressable onPress={ () => onEdit() }>
      <Text style= { styles.text }>EDIT</Text>
    </Pressable>

  const deleteButton = () =>
    <Pressable onPress={ () => onDelete() } >
      <Text style= { styles.text }>DELETE</Text>
    </Pressable>

  return (
    <View style={[ styles.container ]}>
      <Text style={[ styles.text, styles.title ]}>Checklist</Text>
      { editCount >= 1 && editPane() }
    </View>
  )
}

export default Banner