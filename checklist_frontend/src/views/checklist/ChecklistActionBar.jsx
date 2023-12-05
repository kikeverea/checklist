import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useContext } from 'react'
import { useNavigate } from 'react-router-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import UserIcon from '../users/UserIcon'
import Banner from '../main/Banner'
import useTaskSelection from '../../hooks/useTaskSelection'
import UserContext from '../../contexts/UserContext'
import { colors } from '../../styles/styles'
import IconButton from '../main/IconButton'

const ChecklistActionBar = ({ onDelete }) => {

  const styles = StyleSheet.create({
    text: {
      color: colors.icons,
      fontWeight: 'bold'
    }
  })

  const selectedTasks = useTaskSelection()
  const [user] = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <Banner>
      <View>
        { selectedTasks.length() === 0
            ? <Text style={ styles.text }>Tareas</Text>
            : <IconButton name='arrow-left' onPress={ () => selectedTasks.clear() }/>
        }
      </View>
      <View>
        { selectedTasks.length() === 0
            ? <UserIcon userInfo={ user.info } doAction={ () => navigate('/user') } color={ colors.accent }/>
            : <IconButton name='delete' onPress={ () => onDelete() }/>
        }
      </View>
    </Banner>
  )
}

export default ChecklistActionBar