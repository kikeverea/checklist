import { StyleSheet, View, TouchableHighlight } from 'react-native'
import { colors } from '../../styles/styles'

const Roundshape = ({ size, color, children, asButton = null }) => {

  const adjustColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  const underlayColor = adjustColor(color, 10)

  const backgroundColor =
    asButton && !asButton.disabled
    ? color
    : colors.secondary

  const styles = StyleSheet.create({
    roundshape: {
      backgroundColor,
      justifyContent:'center',
      alignItems:'center',
      paddingBottom: 1 * size / 42,
      height: size,
      width: size,
      borderRadius: size / 2  // height / 2
    }
  })

  const wrapInContainer = children => {
    return (
      asButton
        ? <TouchableHighlight
            style={ styles.roundshape }
            activeOpacity={0.6}
            underlayColor={ underlayColor }
            onPress={ asButton.action }
        >
            { children }
          </TouchableHighlight>
        : <View style={ styles.roundshape }>{ children }</View>
    )
  }

  const r =  wrapInContainer(children)
  
  console.log(r);
  
  return r
}

export default Roundshape