import { Text, View, StyleSheet } from 'react-native'
import { colors } from '../../styles/styles'

const TaskDescription = ({ description, height }) => {

  const styles = StyleSheet.create({
    mainText: {
      color: colors.textPrimary,
      fontSize: 16,
      paddingVertical: 4,      
    }
  })

  return (
    <View style={{ height }}>
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