import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
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
      <View style={styles.btn}>
        <FormRegister
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

export default Register