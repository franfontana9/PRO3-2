import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

class Post extends Component {

  constructor(props){
    super(props)
    this.state={
      isLiked:true
    }
  }

  componentDidMount(){
    if(this.props.data.data.likes){
      let estaMiLike = this.props.data.data.likes.includes(auth.currentUser.email) 
    if(estaMiLike === true){
      this.setState({
      isLiked: true
      })
    }else{
      this.setState({
        isLiked: false
        })
    }
    }
   
  }

  unLiked(){
    db.collection('posts')
    .doc(this.props.data.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then((resp)=>{
      this.setState({
        isLiked:false
    })
    })
    .catch((err)=> console.log(err))
  }

  like(){

    db.collection('posts')
    .doc(this.props.data.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then((resp)=>{
      this.setState({
        isLiked:true
    })
    })
    .catch((err)=> console.log(err))
  }

  render() {
    return (
      <View styles={styles.container}>
        <Text>{this.props.data.data.owner}</Text>
        <Image
        source={{uri: this.props.data.foto}}
        style={styles.img}
        
        />
      
        <Text>{this.props.data.data.descripcion}</Text>
        <View style={styles.btnsContainer}>
        {
          this.state.isLiked ?
          <TouchableOpacity
          style={styles.btnLike}
          onPress={()=>this.unLiked()}
          >
            <FontAwesome
            name='heart' 
            size={24} 
            color='red'
            />  
          </TouchableOpacity>
          :
          <TouchableOpacity
          onPress={()=> this.like()}
          style={styles.btnLike}
          >
            <FontAwesome
            name='heart-o' 
            size={24} 
            color='red'
             />  
          </TouchableOpacity>
          
        }
      
          <TouchableOpacity
          style={styles.btnComentario}
            onPress={()=> this.props.navigation.navigate('Comments', {id: this.props.data.id})}
          >
            <Text>Agregar comentario</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      )
  }
}

const styles = StyleSheet.create ({
  container:{
    flex:1
  },
img:{
  height: 200 
},
btnsContainer:{
  flexDirection: 'row'
},
btnLike:{
  flex:2
},
btnComentario:{
  flex:1
}


})


export default Post