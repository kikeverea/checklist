import { StyleSheet, View, Text } from 'react-native'
import UserIcon from './UserIcon'
import { colors } from '../../styles/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const UserItem = ({ user }) => {
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center',
      paddingRight: 4
    },
    usernameContainer: {
      flex: 1
    }
  })
  
  return (
    <View style={ styles.container }>
      <UserIcon userInfo={ user.info } color={ colors.primaryDark }/>
      <Text style={ styles.usernameContainer }>{ user.info.name ? user.info.name : user.info.username }</Text>
      <Icon name='close' size={ 14 }/>
    </View>
  )
}

export default UserItem