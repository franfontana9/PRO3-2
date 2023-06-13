import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import ComentariosForm from '../components/Comentarios'
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
      <View style={styles.btn}>
         <FlatList
            data={this.state.data.comments}
            keyExtractor={item => item.createdAt.toString()}
            renderItem={({item}) => <Text>{item.comentario}</Text>}
        />
        <ComentariosForm idPost={this.props.route.params.id} />
      </View>
    )
  }
}

const styles= StyleSheet.create({
  btn:{
     flex:1,
     backgroundColor:'white'
  }
})