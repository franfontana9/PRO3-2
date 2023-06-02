import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Touchable } from 'react-native'
import { auth } from '../firebase/config'

class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    logeo(email,password){
        auth.signInWithEmailAndPassword(email, password)
        .then( resp => this.props.navigation.navigate('HomeNav'))
        .catch( err => console.log(err))
    }

  render(){
    return (
    <View>
        <TextInput
        placeholder='mail'
        keyboardType='email-address'
        value={this.state.email}
        onChangeText={(text)=>this.setState({email:text})}
        style={styles.input}
        />

        <TextInput
        placeholder='Password'
        keyboardType='email-address'
        value={this.state.password}
        onChangeText={(text)=>this.setState({password:text})}
        style={styles.input}
        secureTextEntry={true}
        />

        <TouchableOpacity
        onPress={()=> this.logeo(this.state.email, this.state.password)}
        style={styles.btn}
        >
        <Text>Ingresa</Text>

        </TouchableOpacity>

    </View>
        )
  }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:16,
        margin: 16
    },
    input:{
        borderWidth:1,
        borderColor: '#c3c3c3',
        borderRadius:5,
        marginTop:16,
        padding:10
    },
    btn:{
        marginVertical:32,
        backgroundColor:'#54d0e0',
    }
})

export default FormLogin