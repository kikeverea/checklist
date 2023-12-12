import Roundshape from '../main/Roundshape';

const UserIcon = ({ userInfo = { name: '?' }, doAction, size = 2, color }) => {

  const userInitial =
    userInfo.name
      ? userInfo.name.charAt(0)
      : userInfo.username.charAt(0)

  return (
    <Roundshape content={ userInitial } doAction={ doAction } size={ size } color={ color } />
  )
}

export default UserIcon