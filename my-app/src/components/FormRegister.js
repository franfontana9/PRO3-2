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
            inputBio:'',
        }
    }

    registrarUsuario(mail, password, inputBio, inputUsername, fotoPerfil){
        auth.createUserWithEmailAndPassword(mail, password)
        .then( data=> {
            db.collection('users').add({
                owner:auth.currentUser.email,
                createdAt: Date.now(),
                fotoPerfil:'',
                inputBio: inputBio,
                inputUsername: inputUsername
            })
            .then(resp => {
                console.log(resp)
                this.props.navigation.navigate('InfoAdicionalUser', {docId: resp.id })
                })
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
        placeholder='Email'
        onChangeText={(text)=> this.setState({inputMail: text})}
        value={this.state.inputMail}
        />

        <TextInput
        style={styles.input}
        keyboardType='email-address'
        placeholder='Username'
        onChangeText={(text)=> this.setState({inputUsername: text})}
        value={this.state.inputUsername}
        />

        <TextInput
        style = {styles.input}
        placeholder= 'Mini Bio'
        keyboardType="default"
        onChangeText={(text) => this.setState({inputBio:text})}
        value={this.state.inputBio}
        />

        <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={(text)=> this.setState({inputPassword: text})}
        value={this.state.inputPassword}
        secureTextEntry={true}
        />

        { this.state.inputMail && this.state.inputPassword && this.state.inputUsername != '' ?
        <TouchableOpacity
        style={styles.btn}
        onPress={()=> this.registrarUsuario(this.state.inputMail, this.state.inputPassword, this.state.inputBio, this.state.inputUsername)}
        >
        <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity> :
            <Text style={styles.btnText2}>Complete Email, Username and Password </Text>
        }
        
        <TouchableOpacity 
        onPress={()=> this.props.navigation.navigate('Login')}
        >
          <Text style={styles.btnText1}>Already have an account? <Text style={styles.color}>Sign In!</Text></Text>
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

export default FormRegister