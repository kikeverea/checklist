import { Pressable } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from "../../styles/styles"

const IconButton = ({ name, size = 24, color = colors.icons, onPress }) => {
  
  return (
    <Pressable onPress={ onPress }>
      <Icon name={ name } size={ size } color={ color } />
    </Pressable>
  )
}

export default IconButton