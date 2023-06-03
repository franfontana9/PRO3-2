import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Touchable } from 'react-native'
import {auth,db} from '../firebase/config'

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state ={ 
            inputMail: '',
            inputPassword: '',
            inputUsername:''
        }
    }

    registrarUsuario(mail, password){
        auth.createUserWithEmailAndPassword(mail, password)
        .then( data=> {
            this.props.navigation.navigate('HomeNav')
            db.collection('users').add({
                owner:auth.currentUser.email,
                createdAt: Date.now()
            })
            .then(resp=>console.log(resp))
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }

  render() {
    return (
        <View>
        <TextInput
        style={styles.input}
        keyboardType='email-address'
        placeholder='email'
        onChangeText={(text)=> this.setState({inputMail: text})}
        value={this.state.inputMail}
        />
        <TextInput
        style={styles.input}
        keyboardType='email-address'
        placeholder='User Name'
        onChangeText={(text)=> this.setState({inputUsername: text})}
        value={this.state.inputUsername}
        />
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
        <Text style={styles.btnText} 
        >Logea mi usuario gil
        </Text>
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
        padding:5,
        marginTop:16
    },
    btn:{
        backgroundColor:'#54d0e0',
        borderRadius:10,
        padding:16,
        marginTop:48
    },
    btnText:{
        textAlign:'center',
        color:'black'
    }
})

export default FormRegister