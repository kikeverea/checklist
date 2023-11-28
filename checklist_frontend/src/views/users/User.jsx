import { View, Text } from "react-native"

const User = ({ user }) => {
  return (
    <View>
      <Text>{ JSON.stringify(user) }</Text>
    </View>
  )
}

export default User