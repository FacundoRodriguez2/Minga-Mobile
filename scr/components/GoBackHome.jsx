import React from 'react'
import { Text,StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';

function GoBackHome() {
  const navigation = useNavigation()
  function navigateHome(){
    navigation.navigate('Home');
  }

  return (
    <Text style={styles.loginText}>Go back to <Text style={styles.link} onPress={navigateHome}>home page</Text></Text>
  )
}

const styles = StyleSheet.create({
    loginText: {
        textAlign: 'center'
    },
    link: {
        textDecorationLine: 'none',
        color: 'rgb(245, 118, 184)',
        fontWeight: 'bold'
    }
})

export default GoBackHome