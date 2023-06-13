import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native'
import ProfileData from '../components/ProfileData'
import { AntDesign } from '@expo/vector-icons';
import { db, auth } from '../firebase/config'
import Post from '../components/Post'

class Profile extends Component {

  constructor(props){
      super(props)
      this.state={
      infoUsuario:[],
      posteos:[]

    }
  }

  logout(){
            auth.signOut()
            .then(resp=> this.props.navigation.navigate('Login'))
            .catch(err=>console.log(err))
        }

  componentDidMount() {
    db.collection("users").where("owner", "==", auth.currentUser.email).onSnapshot(
        (docs) => {

            let usuarios = []
            docs.forEach((doc) => {
                usuarios.push({

                    data: doc.data()
                })
            })
            this.setState({
                infoUsuario: usuarios,

            })
        })
    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
        docs => {
            let posts = [];
            docs.forEach(doc => {
                console.log('posts,', doc.data())
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            console.log(posts,'posts usuario logeado')
            this.setState({
                posteos: posts
            })
        }
    )
}


  render() {
    return (
    <View>
      <Text>{this.state.infoUsuario.owner}</Text>

      <TouchableOpacity
                    style={styles.info}
                >
                    <Text style={styles.info}></Text>
            
                    {this.state.infoUsuario[0]?.data.bio != '' ?
                        <Text style={styles.info}>{this.state.infoUsuario[0]?.data.bio}</Text>
                        : null}

                    <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
      </TouchableOpacity>

      <FlatList
      data={this.state.usuarios}
      keyExtractor={(item)=> item.id.toString()}
      renderItem={({item})=> 
      <Text> {item.data.owner} </Text>}
      />

      <TouchableOpacity
        onPress={()=> this.logout()}
        >        
        <Text style={styles.info1}>
          <AntDesign name="logout" size={20} color="white" />
           Sing Out</Text>
      </TouchableOpacity>  

    </View>    
)
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#BC9FC0',
      overflow: 'auto'

  },

  info: {
      fontSize: 13,
      fontWeight: '600',
      color: 'white',
      textAlign: 'center', 
      alignItems: 'center',
      margin: 10,
      backgroundColor: '#9183A7',

  },
  info1: {
      fontSize: 13,
      fontWeight: '600',
      color: 'white',
      textAlign: 'right',
      marginLeft: 5,
      textAlign: 'center',
      margin: 10,
      backgroundColor: '#9183A7' ,
      
  },
  arrow: {
      alignItems: 'center',
  },

})


export default Profile