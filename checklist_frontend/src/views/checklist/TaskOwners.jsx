import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { colors } from '../../styles/styles'
import UserItem from '../users/UserItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const TaskOwners = ({ height }) => {

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
    }
  })

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
      <ScrollView>
          <View style={ styles.ownersContainer }>
            <UserItem user={{ info: { name: 'Lorem Ipsum' }}}/>
            <UserItem user={{ info: { name: 'Lorem Ipsum' }}}/>
            <UserItem user={{ info: { name: 'Lorem Ipsum' }}}/>
            <UserItem user={{ info: { name: 'Lorem Ipsum' }}}/>
            <UserItem user={{ info: { name: 'Lorem Ipsum' }}}/>
          </View>
        </ScrollView>
    </View>
  )
}

export default TaskOwners