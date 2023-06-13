import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import FormLogin from '../components/FormLogin'

class Login extends Component {
  render() {
    return (
        <View style={styles.btn}> 
        <FormLogin
        navigation={this.props.navigation}
        />
      </View>
    )
  }
}

const styles= StyleSheet.create({
  btn:{
     flex:1
  }
})

export default Login