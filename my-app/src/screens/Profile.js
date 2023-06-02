import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList } from 'react-native'
import ProfileData from '../components/ProfileData'
import { db } from '../firebase/config'

class Profile extends Component {

  constructor(props){
      super(props)
      this.state={
      usuarios:[]
    }
  }

  componentDidMount(){
    db.collection('users').onSnapshot(
      docs=> {
        let arrayUsuarios = []
        docs.forEach(doc => arrayUsuarios.push({
          id: doc.id,
          data:doc.data()
        }))
        this.setState({
          usuarios:arrayUsuarios,
          loading:false
        })
      }
    )
  }


  render() {
    return (
    <View>
      <Text>Info Personal</Text>
      <ProfileData navigation={this.props.navigation}/>
      <FlatList
      data={this.state.usuarios}
      keyExtractor={(item)=> item.id.toString()}
      renderItem={({item})=> <Text> {item.data.owner} </Text>}
      />
    </View>    
)
  }
}


export default Profile