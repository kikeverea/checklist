import { Dimensions, StyleSheet, View } from 'react-native'
import { colors } from '../../styles/styles'

const Banner = ({ children }) => {

  const screenWidth = Dimensions.get('window').width

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: screenWidth,
      alignItems: 'center',
      backgroundColor: colors.primaryDark,
      paddingLeft: 16,
      paddingRight: 16,
      height: 60
    }
  })

  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default Banner