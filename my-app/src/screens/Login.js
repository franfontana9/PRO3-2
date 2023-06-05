import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FormLogin from '../components/FormLogin'

class Login extends Component {
  render() {
    return (
        <View>
        <Text>Login</Text>
        <FormLogin
        navigation={this.props.navigation}
        />
        <Text>No tenes cuenta?
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
          <Text>Registrate Aca</Text>
        </TouchableOpacity>
        </Text>
      </View>
    )
  }
}

export default Login