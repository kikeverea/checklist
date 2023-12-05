import { Text, View, StyleSheet } from 'react-native'
import { colors } from '../../styles/styles'

const TaskDescription = ({ description, style, show = true }) => {

  if (!show)
    return null

  const styles = StyleSheet.create({
    container: {
      ...style,
      padding: 16
    },
    mainText: {
      color: colors.textPrimary,
      fontSize: 16,
      paddingVertical: 4,
    }
  })

  return (
    <View style={ styles.container }>
      <Text>
        Descripción
      </Text>
      <Text style={ styles.mainText }>
        { description }
      </Text>
    </View>
  )
}

export default TaskDescription