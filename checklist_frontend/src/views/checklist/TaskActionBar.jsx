import { StyleSheet, Text } from 'react-native'
import Banner from '../../components/Banner'
import BackButton from '../../components/BackButton'
import { colors } from '../../styles/styles'

const TaskActionBar = ({ task, height, show = true}) => {

  if (!show)
    return null
  
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
    <Banner height={ height }>
      <BackButton />
      <Text style={[ styles.text, styles.titleContainer ]}>
        Tarea
      </Text>
    </Banner>
  )
}

export default TaskActionBar