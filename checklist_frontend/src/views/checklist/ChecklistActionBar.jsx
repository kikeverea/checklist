import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useContext } from 'react'
import { useNavigate } from 'react-router-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import UserIcon from '../users/UserIcon'
import useTaskSelection from '../../hooks/useTaskSelection'
import UserContext from '../../contexts/UserContext'
import { colors } from '../../styles/styles'

const ChecklistActionBar = ({ onDelete }) => {

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
    text: {
      color: colors.icons,
      fontWeight: 'bold'
    }
  })

  const selectedTasks = useTaskSelection()
  const [user] = useContext(UserContext)
  const navigate = useNavigate()

  const deleteButton = () => {
    return (
      <Pressable onPress={ () => onDelete() } >
        <Icon name='delete' size={24} color='#FFF' />
      </Pressable>
    )
  }

  const cancelDeleteButton = () => {
    return (
      <Pressable onPress={ () => selectedTasks.clear() } >
        <Icon name='arrow-left' size={24} color='#FFF' />
      </Pressable>
    )
  }

  return (
    <View style={ styles.container }>
      <View>
        { selectedTasks.length() === 0 ? <Text style={ styles.text }>Tareas</Text> : cancelDeleteButton() }
      </View>
      <View>
        { selectedTasks.length() === 0 ? <UserIcon userInfo={ user.info } doAction={ () => navigate('/user') } color={ colors.accent }/> : deleteButton() }
      </View>
    </View>
  )
}

export default ChecklistActionBar