import { View, Text, Button, Dimensions, TouchableOpacity } from 'react-native'
import { useState, useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import UserIcon from './UserIcon'
import UserContext from '../../contexts/UserContext'
import { colors } from '../../styles/styles'
import usersService from '../../services/usersService'
import useUserSession from '../../hooks/useUserSession'
import { useNavigate } from 'react-router-native'
import Banner from '../main/Banner'
import DeleteUserDialog from '../dialogs/DeleteUserDialog'
import BackButton from '../main/BackButton'

const User = () => {

  const screenHeight = Dimensions.get('window').height

  const styles = StyleSheet.create({
    container: {
      height: screenHeight,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: 48
    },
    userInfoContainer: {
      paddingVertical: 32,
      alignItems: 'center',
      gap: 8
    },
    userInfo: {
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
      borderColor: colors.critical,
    },
    deleteContainer: {
      flex: 1,
      justifyContent: 'flex-end'
    },
    deleteButtonText: {
      color: colors.critical
    }
  })

  const [userInfo, setUserInfo] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const navigate = useNavigate()
  const [_user, _login, logout, deleteAccount] = useUserSession()
  const [user] = useContext(UserContext)

  useEffect(() => {
    usersService.me(user).then(user => setUserInfo(user))
  }, [])

  const logoutUser = async () => {
    await logout()
    navigate('/login')
  }

  const dismissDeleteDialog = async doDelete => { 
    setShowDeleteDialog(false)

    if (doDelete) {
      try {
        await deleteAccount(user)
      }
      catch (e) {
        console.error(e.response ? e.response : e)
      }
      finally {
        navigate('/login')
      }
    }
  }

  const DeleteButton = ({ onPress }) => {
    return (
      <TouchableOpacity style={ styles.deleteButton } onPress={ onPress }>
        <Text style={ styles.deleteButtonText }>ELIMINAR CUENTA</Text>
      </TouchableOpacity>
    )
  }

  if (userInfo === null)
    return null

  return (
    <View style={ styles.container }>
      { showDeleteDialog && <DeleteUserDialog dismiss={ dismissDeleteDialog }/> }
      <Banner>
        <BackButton />
      </Banner>
      <View style={ styles.userInfoContainer }>
        <UserIcon userInfo={ userInfo } size={ 2 } color={ colors.primaryDark } />
        <View style={ styles.userInfo }>
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
      </View>
      <View style={ styles.deleteContainer }>
        <DeleteButton onPress={ () => setShowDeleteDialog(true) }/>
      </View>
    </View>
  )
}

export default User