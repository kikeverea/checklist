import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'

const UserIcon = ({ userInfo = { name: '?' }, doAction, size = 1, color }) => {
  
  const diameter = size * 42

  // make color lighter (amount > 0) or darker (amount < 0)
  const adjustColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  const backgroundColor = color
  const underlayColor = adjustColor(color, 10)
  
  const styles = StyleSheet.create({
    item: {
      color:'white',
      fontSize: 3 * diameter / 7,
    },
    roundshape: {
      color: 'white',
      backgroundColor,
      justifyContent:'center',
      alignItems:'center',
      paddingBottom: 1 * diameter / 42,
      height: diameter,
      width: diameter,
      borderRadius: diameter / 2  // height / 2
    }
  })

  const userInitial =
    userInfo.name
      ? userInfo.name.charAt(0)
      : userInfo.username.charAt(0)

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
    <Text style={ styles.item }>{ userInitial }</Text>
  )
}

export default UserIcon