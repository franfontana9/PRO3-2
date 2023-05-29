import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Touchable } from 'react-native'
import { auth } from '../firebase/config'

class FormRegister extends Component {
  render() {
    return (
        <View>
        <Text>Login</Text>
        <TextInput
        keyboardType='email-address'
        placeholder='email'
        onChangeText={text=> this.setState
        }
        />
        </View>
        )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor: '#3d3d3d',
        marginTop: 24,
        height:24,
        padding:5
    }
})

export default FormRegister