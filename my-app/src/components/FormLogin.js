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
    <View style={styles.form}>
        <TextInput
        placeholder='Email'
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

        { this.state.email && this.state.password != '' ?
        <TouchableOpacity
        onPress={()=> this.logeo(this.state.email, this.state.password)}
        style={styles.btn}
        >
        <Text  style={styles.btnText} >Login</Text>
        </TouchableOpacity> :
            <Text style={styles.btnText2}>Complete Email and Password </Text>
        }

        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
        <Text style={styles.btnText1}>Don't have an account? <Text style={styles.color}>Sign Up Here!</Text></Text>
        </TouchableOpacity>
    </View>
        )
  }
}

const styles= StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: '#3d3d3d',
        height:30,
        borderRadius:10,
        padding:15,
        marginTop:16,
        backgroundColor:'white'

    },
    btn:{
        backgroundColor:'gray',
        borderRadius:10,
        padding:16,
        marginTop:10,

    },
    btnText:{
        textAlign:'center',
        color:'black',
        fontWeight: 'bold',
    },
    form:{
        flex:1,
        backgroundColor: 'white',
        margin: 0,
        borderRadius:10,
        padding:10,
    },
    btnText1:{
        margin:10,
        textAlign:'center',
        color:'black'
    },
    btnText2:{
        margin:10,
        textAlign:'center',
        color:'red'
    },
    color:{
        fontWeight: 'bold',
        
    }
})
export default FormLogin