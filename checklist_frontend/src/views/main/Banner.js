import { View, Text, StyleSheet, Pressable, TouchableHighlight } from 'react-native'
import { colors } from '../../styles/styles'

const Banner = ({ editCount, onEdit, onDelete }) => {

  const UserIcon = ({ text }) => {
    const styles = StyleSheet.create({
      item: {
        color:'white',
        fontSize: 18,
      },
      roundshape: {
        color: 'white',
        backgroundColor: colors.accent,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom: 1,
        height: 42,
        width: 42,
        borderRadius: 21    // height / 2
      }
    })

    return (
      <View>
          <TouchableHighlight
            style={ styles.roundshape }
            activeOpacity={0.6}
            underlayColor={ colors.accentLight }
            onPress={() => console.log('Pressed!')}
          >
             <Text style={ styles.item }>{ text }</Text>
          </TouchableHighlight>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.primaryDark,
      paddingLeft: 16,
      paddingRight: 16,
      height: 60,
        
    },
    editPane: {
      flexDirection: 'row',
      gap: 16
    },
    text: {
      color: colors.icons,
      fontWeight: 'bold'
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
    <View style={ styles.container }>
      <Text style={styles.text}>Tareas</Text>
      <UserIcon text='U' />
      { editCount >= 1 && editPane() }
    </View>
  )
}

export default Banner