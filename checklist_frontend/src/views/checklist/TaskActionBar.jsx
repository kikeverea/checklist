import { StyleSheet, Text } from 'react-native'
import Banner from '../main/Banner'
import { colors } from '../../styles/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const TaskActionBar = ({ task }) => {
  
  const styles = StyleSheet.create({
    text: {
      color: colors.icons,
      fontWeight: 'bold'
    },
    titleContainer: {
      flex: 1,
      textAlign: 'center',
      paddingRight: 12
    }
  })

  return (
    <Banner>
      <Icon name='arrow-left' size={24} color='#FFF' />
      <Text style={[ styles.text, styles.titleContainer ]}>
        Tarea
      </Text>
    </Banner>
  )
}

export default TaskActionBar