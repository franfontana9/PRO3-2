import { Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'


export default class ComentariosForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            comentario:''
        }
    }

    crearComentario(comentario){
        db.collection('posts')
        .doc(this.props.idPost)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                comentario: comentario
            })
        })
    }

  render() {
    return (
      <View style={styles.form}>
        <TextInput
        keyboardType='default'
        style = {styles.input}
        onChangeText={text => this.setState({comentario: text})}
        value={this.state.comentario}
        placeholder='Crea tu comentario'
        />
        <TouchableOpacity onPress={()=> this.crearComentario(this.state.comentario)}>
        <FontAwesome
            name='send' 
            size={24} 
             />  
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
        flexDirection:'row',
        margin: 10,
        borderRadius:10,
        padding:10,
    },
    btnText1:{
        margin:10,
        textAlign:'center',
        color:'black'
    }
})

