import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'

const Roundshape = ({ content, doAction, size = 1, color }) => {
  
  const SIZE_CONSTANT = 21
  const diameter = size * SIZE_CONSTANT

  // make color lighter (amount > 0) or darker (amount < 0)
  const adjustColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  const underlayColor = adjustColor(color, 10)
  
  const styles = StyleSheet.create({
    item: {
      color:'white',
      fontSize: 9 * diameter / SIZE_CONSTANT,
    },
    roundshape: {
      color: 'white',
      backgroundColor: color,
      justifyContent:'center',
      alignItems:'center',
      paddingBottom: diameter / SIZE_CONSTANT,
      height: diameter,
      width: diameter,
      borderRadius: diameter / 2  // height / 2
    }
  })

  const wrapInContainer = roundshape => {
    return (
      doAction
        ? <TouchableHighlight
            style={ styles.roundshape }
            activeOpacity={0.6}
            underlayColor={ underlayColor }
            onPress={ doAction }
        >
            { roundshape }
          </TouchableHighlight>
        : <View style={ styles.roundshape }>{ roundshape }</View>
    )
  }

  return wrapInContainer(
    <Text style={ styles.item }>{ content }</Text>
  )
}

export default Roundshape