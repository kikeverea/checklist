import { StyleSheet, View, Text } from 'react-native'
import UserIcon from './UserIcon'
import { colors } from '../../styles/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import useUserQuery from '../../hooks/useUserQuery'
import { useEffect } from 'react'

const UserItem = ({ userId }) => {
  
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

  const [queryUser, user, loading, error] = useUserQuery(userId)
  
  useEffect(() => {
    queryUser({ id: userId })
  }, [])

  useEffect(() => {
    if (error)
      Toast.show({
        type: 'error',
        text1: error,
        position: 'bottom'
      })
  }, [error])

  return (
      !loading &&
      <View style={ styles.container }><UserIcon userInfo={ user } color={ colors.primaryDark }/>
        <Text style={ styles.usernameContainer }>{ user.name ? user.name : user.username }</Text>
        <Icon name='close' size={ 14 }/>
      </View>
  )
}

export default UserItem