import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { Feather } from '@expo/vector-icons';

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
      }).then(()=>{
        this.setState({
          comentario:''
        })
      })
      .catch((err)=>console.log(err))
  }

  render() {
    return (
      <View style={styles.form}>
        <TextInput
          keyboardType='default'
          style={styles.input}
          onChangeText={text => this.setState({comentario: text})}
          value={this.state.comentario}
          placeholder='Add a Comment...'
        />
        <TouchableOpacity 
          style={styles.send}
          onPress={() => this.crearComentario(this.state.comentario)}
        >
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#F5F5F5',
    marginRight: 10,
  },
  send: {
    backgroundColor: '#0095f6',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 60, // Added property to set a minimum width
  },
});
