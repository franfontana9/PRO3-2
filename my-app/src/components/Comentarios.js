import { Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

export default class ComentariosForma extends Component {
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
      <View>
        <TextInput
        keyboardType='default'
        style = {styles.input}
        onChangeText={text => this.setState({comentario: text})}
        value={this.state.comentario}
        placeholder='Crea tu comentario'
        />
        <TouchableOpacity
        onPress={()=> this.crearComentario(this.state.comentario)}
        >
            <Text>Enviar comentario</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'red'
    }
})

