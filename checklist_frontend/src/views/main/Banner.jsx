import { Dimensions, StyleSheet, View } from 'react-native'
import { colors } from '../../styles/styles'

const Banner = ({ height = 60, children }) => {

  const screenWidth = Dimensions.get('window').width

  const styles = StyleSheet.create({
    container: {
      width: screenWidth,
      height: height,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.primaryDark,
      paddingLeft: 16,
      paddingRight: 16,
    }
  })

  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default Banner