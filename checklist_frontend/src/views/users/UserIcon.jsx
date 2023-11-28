import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { colors } from '../../styles/styles'

const UserIcon = ({ text }) => {
  const styles = StyleSheet.create({
    item: {
      color:'white',
      fontSize: 18,
    },
    roundshape: {
      color: 'white',
      backgroundColor: colors.accent,
      justifyContent:'center',
      alignItems:'center',
      paddingBottom: 1,
      height: 42,
      width: 42,
      borderRadius: 21  // height / 2
    }
  })

  return (
    <View>
        <TouchableHighlight
          style={ styles.roundshape }
          activeOpacity={0.6}
          underlayColor={ colors.accentLight }
          onPress={() => console.log('Pressed!')}
        >
           <Text style={ styles.item }>{ text }</Text>
        </TouchableHighlight>
    </View>
  )
}

export default UserIcon