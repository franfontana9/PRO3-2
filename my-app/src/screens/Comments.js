import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import ComentariosForma from '../components/Comentarios'
import { db } from '../firebase/config'
export default class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
            data:{}
        }
    }
    componentDidMount(){
        db.collection('posts')
        .doc(this.props.route.params.id)
        .onSnapshot(doc => {
            this.setState({
                data:doc.data()
            }, ()=> console.log(this.state.data))
        })
    }
  render() {
    return (
      <View>
        <Text>Aqui vamos a cargar todos los comentarios del posteo</Text>
         <FlatList
            data={this.state.data.comments}
            keyExtractor={item => item.createdAt.toString()}
            renderItem={({item}) => <Text>{item.comentario}</Text>}
        />
        <ComentariosForma idPost={this.props.route.params.id} />
      </View>
    )
  }
}