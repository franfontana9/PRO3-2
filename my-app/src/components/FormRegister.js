import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Touchable } from 'react-native'
import {auth,db} from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state ={ 
            inputMail: '',
            inputPassword: '',
            inputUsername:'',
            inputBio:''
        }
    }

    registrarUsuario(mail, password, inputBio, inputUsername){
        auth.createUserWithEmailAndPassword(mail, password)
        .then( data=> {
            this.props.navigation.navigate('HomeNav')
            db.collection('users').add({
                owner:auth.currentUser.email,
                createdAt: Date.now(),
                // inputBio: inputBio,
                // inputUsername: inputUsername
            })
            .then(resp=>console.log(resp))
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }

  render() {
    return (
    <View style={styles.form}>
        <TextInput
        style={styles.input}
        keyboardType='email-address'
        placeholder='email'
        onChangeText={(text)=> this.setState({inputMail: text})}
        value={this.state.inputMail}
        />

        {/* <TextInput
        style={styles.input}
        keyboardType='email-address'
        placeholder='User Name'
        onChangeText={(text)=> this.setState({inputUsername: text})}
        value={this.state.inputUsername}
        /> */}

        {/* <TextInput
        style = {styles.input}
        placeholder= 'Escriba una bio'
        keyboardType="default"
        onChangeText={(text) => this.setState({inputBio:text})}
        value={this.state.inputBio}
        /> */}

        <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={(text)=> this.setState({inputPassword: text})}
        value={this.state.inputPassword}
        secureTextEntry={true}
        />

        <TouchableOpacity
        style={styles.btn}
        onPress={()=> this.registrarUsuario(this.state.inputMail, this.state.inputPassword)}
        >
        <Text style={styles.btnText}>Registrarme</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=> this.props.navigation.navigate('Login')}
        >
          <Text style={styles.btnText1}>Ya tenes cuenta? Ingresa Aca!</Text>
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
        marginTop:48,

    },
    btnText:{
        textAlign:'center',
        color:'black',
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
    }
})

export default FormRegister