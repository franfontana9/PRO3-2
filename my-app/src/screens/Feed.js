import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList } from 'react-native'
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
        .where('owner','==',auth.currentUser.email)
        .limit(2)
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
        <View>
            <Text>Feed</Text>
            <Posteos
                data={this.state.posts}
                navigation={this.props.navigation}
            />
        </View>
        )
  }
}

export default Feed