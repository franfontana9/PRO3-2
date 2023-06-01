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
        <Text>Aqui vamos a tener nuestro Registro</Text>
        <FormRegister
          navigation={this.props.navigation}
        />
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('HomeNav', {screen:'Profile'})}>
            <Text>No tienes cuenta? Create tu Perfil</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Register