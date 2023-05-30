import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'

class Register extends Component {
    constructor(props){
        super(props)

    }
  render() {
    return (
      <View>
        <Text>Register</Text>
        <FormRegister/>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('HomeNav')}>
            <Text>No tienes cuenta? jodete forro</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Register