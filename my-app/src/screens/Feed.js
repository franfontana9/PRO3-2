import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList } from 'react-native'
import { db } from '../firebase/config'
import Posteos from '../components/Posteos'

class Feed extends Component {

    constructor(props){
        super()
        this.state={
            posts:[]
        }
    }


    componentDidMount(){
        db.collection('posts').onSnapshot(docs=>{

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
        <View>
            <Text>Feed</Text>
            <Posteos
                data={this.state.posts}
            />
        </View>
        )
  }
}

export default Feed