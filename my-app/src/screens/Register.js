import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import Login from './Login'
import { auth } from '../firebase/config'

class Register extends Component {
    componentDidMount(){
      auth.onAuthStateChanged(user=>{
        if(user){
          this.props.navigation.navigate('HomeNav')
        }

      })
    }
  render() {
    return (
      <View>
        <FormRegister
          navigation={this.props.navigation}
        />
        <Text>Ya tenes cuenta?
        <TouchableOpacity 
        onPress={()=> this.props.navigation.navigate('Login')}
        >
          <Text>Ingresa ACA</Text>
        </TouchableOpacity>
        </Text>
      </View>
    )
  }
}

export default Register