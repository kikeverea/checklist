import { View, Text, Button, Dimensions, TouchableOpacity } from 'react-native'
import { useState, useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import UserIcon from './UserIcon'
import UserContext from '../../contexts/UserContext'
import { colors } from '../../styles/styles'
import usersService from '../../services/usersService'
import useSession from '../../hooks/useSession'
import { useNavigate } from 'react-router-native'

const User = () => {

  const screenHeight = Dimensions.get('window').height

  const styles = StyleSheet.create({
    container: {
      height: screenHeight,
      alignItems: 'center',
      paddingVertical: 48,
      gap: 8
    },
    subContainer: {
      alignItems: 'center'
    },
    name : {
      fontSize: 18
    },
    email: {
      padding: 8,
      color: 'gray',
      fontSize: 11,
      fontStyle: 'italic'
    },
    logoutButton: {
      marginVertical: 8
    },
    deleteButton: {
      padding: 8,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#cc0000',
    },
    deleteContainer: {
      flex: 1,
      justifyContent: 'flex-end'
    }
  })

  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()
  const [_, logout] = useSession()
  const [user] = useContext(UserContext)

  useEffect(() => {
    usersService.me(user).then(user => setUserInfo(user))
  }, [])

  if (userInfo === null)
    return null

  const DeleteButton = () => {
    return (
      <TouchableOpacity style={ styles.deleteButton }>
        <Text style={{ color: '#cc0000' }}>ELIMINAR CUENTA</Text>
      </TouchableOpacity>
    )
  }

  const logoutUser = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <View style={ styles.container }>
      <UserIcon userInfo={ userInfo } size={ 2 } color={ colors.primaryDark } />
      <View style={ styles.subContainer }>
        <Text style={ styles.name }>{ userInfo.name }</Text>
        <Text>{ userInfo.username }</Text>
        <Text style={ styles.email }>{ userInfo.email }</Text>
      </View>
      <Button
        title='Cerrar Sesión'
        style={ styles.logoutButton }
        color={ colors.secondary }
        onPress={ ()=> logoutUser() }
      />
      <View style={ styles.deleteContainer }>
        <DeleteButton />
      </View>
    </View>
  )
}

export default User