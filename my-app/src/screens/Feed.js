import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'
import Posteos from '../components/Posteos'

class Feed extends Component {

    constructor(props){
        super()
        this.state={
            posts:[]
        }
    }


    componentDidMount(){
        db.collection('posts')
        .orderBy('createdAt','desc')
        .onSnapshot(docs=>{

            let arrayDocs=[]

            docs.forEach(docs=>arrayDocs.push({
                id: docs.id,
                data: docs.data()
            }))
            console.log(arrayDocs);
            this.setState({
                posts:arrayDocs
            })
        })
    }
  render() {
    return (
        <View style={styles.container}>
            <Text>Feed</Text>
            <Posteos
                data={this.state.posts}
                navigation={this.props.navigation}
            />
        </View>
        )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }

})

export default Feed