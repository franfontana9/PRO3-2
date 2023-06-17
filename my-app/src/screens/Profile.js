import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList, StyleSheet, Image } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: props,
      usuario: [],
      posteos: []
    };
  }

  logout() {
    auth
      .signOut()
      .then((resp) => this.props.navigation.navigate('Login'))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let users = [];
        docs.forEach((doc) => {
          console.log('users,', doc.data());
          users.push({
            data: doc.data()
          });
        });
        this.setState({
          usuario: users
        });
      });
    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          console.log('posts,', doc.data());
          posts.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.setState({
          posteos: posts
        });
      });
  }

    render() {
      return (
        <View style={styles.container}>
          <Image 
          source={{ uri: this.state.usuario[0]?.data.fotoPerfil }} 
          style={styles.img} />
          <Text style={styles.username}>{this.state.usuario[0]?.data.inputUsername}</Text>
          
          <View style={styles.bioContainer}>
            {this.state.usuario[0]?.data.inputBio !== '' ? (
              <Text style={styles.bio}>{this.state.usuario[0]?.data.inputBio}</Text>
            ) : null}
            <Text style={styles.postCount}>Posts: {this.state.posteos.length}</Text>
          </View>
      
          <FlatList
            data={this.state.posteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Post data={item} />}
          />
    
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => this.props.navigation.navigate('Edit Profile')}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
    
          <TouchableOpacity 
            onPress={() => this.logout()}
            style={styles.signOutButton}
          >
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 5,
    },
    username: {
      fontSize: 30,
      fontWeight: '600',
      color: 'black',
      textAlign: 'center',
      margin: 5,
    },
    bioContainer: {
      alignItems: 'center',
      margin: 10,
    },
    bio: {
      fontSize: 16,
      color: 'black',
      marginVertical: 5,
    },
    postCount: {
      fontSize: 16,
      color: 'black',
      marginBottom: 10,
    },
    editButton: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
      paddingVertical: 10,
      backgroundColor: '#3897f0',
      borderRadius: 20,
    },
    editButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    signOutButton: {
      fontSize: 13,
      fontWeight: '600',
      color: 'black',
      padding: 10,
      margin: 5,
      textAlign: 'center',
      borderRadius: 100,
      backgroundColor: 'grey',
    },
    signOutButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    img: {
      height: 150,
      width: 150,
      marginBottom: 5,
      borderRadius: 100,
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: 'black',
      marginTop:10
    },
  });
  
  export default Profile