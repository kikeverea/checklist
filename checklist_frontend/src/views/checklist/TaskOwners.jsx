import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { colors } from '../../styles/styles'
import UserItem from '../users/UserItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'

const TaskOwners = ({ height, owners }) => {

  const styles = StyleSheet.create({
    container: {
      height: height,
      gap: 20
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 4
    },
    ownersContainer: {
      gap: 8
    },
    shareButton: {
      padding: 8,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: 'green',
      backgroundColor: colors.icons
    },
    shareButtonText: {
      color: 'green'
    },
    secondaryText: {
      fontSize: 11,
      fontStyle: 'italic',
      color: colors.textSecondary,
      paddingLeft: 4
    }
  })

  const [user] = useContext(UserContext)

  const sharedWith = owners.filter(owner => owner.id !== user.id)

  return (
    <View style={ styles.container }>
      <View style={ styles.titleContainer }>
        <Text>
          Compartida
        </Text>
        <Pressable onPress={ ()=> {} }>
          <Icon name='plus' color='green' size={ 24 }/>
        </Pressable>
      </View>
      { sharedWith.length > 0
        ? <ScrollView>
            <View style={ styles.ownersContainer }>
              { owners.map(owner => <UserItem userId={ owner }/>) }
            </View>
          </ScrollView>
        : <Text style={ styles.secondaryText }>No has compartido la tarea con ningún usuario</Text>
      }
    </View>
  )
}

export default TaskOwners