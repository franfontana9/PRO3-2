import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { db, auth } from '../firebase/config' 


class NewPost extends Component {
    constructor(props){
        super(props)
        this.state ={
            descripcion:'',
            foto:'',
            likes:[],
            comments:[]
        }
    }

    actualizarDescripcion(text){
        if(text != ''){
            this.setState({
                descripcion:text
            })
        }
    }

    crearPoste({descripcion, foto, likes, comments}){
        db.collection('posts').add({
            owner: auth.currentUser.email ,
            descripcion: descripcion,
            foto,
            createdAt,
            likes,
            comments: Date.now()
        })
        .then((resp)=>{
            this.props.navigation.navigate('Feed')
        })
    }

  render() {
    return (
    <View>
        <FormPost
        stateDescripcion={this.state.descripcion}
        actualizarDescripcion={(text)=> this.actualizarDescripcion(text)}
        />      
        <TouchableOpacity
            onPress={()=> this.crearPoste({
                descripcion: this.state.descripcion,
                foto:this.state.foto,
                likes:this.state.likes,
                comments:this.state.comments
            })}
        >
            <Text>Enviar el posteo</Text>
        </TouchableOpacity>
    </View>
    )
  }
}


export default NewPost