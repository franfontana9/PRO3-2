import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native'
import { db, auth } from '../firebase/config'
import Post from '../components/Post'


class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      props:props,
      usuario: [],
      posteos: []
    }
  }

  logout() {
    auth.signOut()
      .then(resp => this.props.navigation.navigate('Login'))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    db.collection("users").where("owner", "==", auth.currentUser.email).onSnapshot(
      (docs) => {

        let users = []
        docs.forEach((doc) => {
          console.log('users,', doc.data())
          users.push({
            data: doc.data()
          })
        })
        this.setState({
          usuario: users,

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
        this.setState({
          posteos: posts
        })
      }
    )
  }


  render() {
    return (
      <View style={styles.container}>
        
        <Text style= {styles.info}>{this.state.usuario.inputUsername}</Text>

        <TouchableOpacity style={styles.info}>
          <Text style={styles.info}></Text>
          {this.state.usuario[0]?.data.bio != '' ?
            <Text style={styles.info}>{this.state.usuario[0]?.data.bio}</Text>
            : null}

          <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
        </TouchableOpacity>

        

        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Post data={item} />}
        />

        <TouchableOpacity
          onPress={() => this.logout()}
        >
          <Text style={styles.info1}>
            Sing Out</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  info: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor:'white'

  },
  info1: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
    padding:10,
    marginLeft: 100,
    marginRight:100,
    margin:10,
    textAlign: 'center',
    borderRadius:100,
    backgroundColor:'grey'

  },
  arrow: {
    alignItems: 'center',
  },

})


export default Profile