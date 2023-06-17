import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore";

class EditPerfil extends Component {
  constructor() {
    super();
    this.state = {
      usuario: [],
      inputPassword: '',
      inputUsername: '',
      inputBio: '',
      errorAlEditar: false,
      errores: ''
    };
  }

  componentDidMount() {
    db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
      (docs) => {
        let user = [];
        docs.forEach((doc) => {
          user.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        if (user.length > 0) {
          const { inputUsername, inputBio } = user[0].data;
          this.setState({
            usuario: user,
            inputUsername: inputUsername || '',
            inputBio: inputBio || ''
          });
        }
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { inputUsername, inputBio } = this.state.usuario[0].data;
      this.setState({
        inputUsername: inputUsername || '',
        inputBio: inputBio || ''
      });
    }
  }

  actualizar(inputPassword, inputUsername, inputBio) {
    if (inputPassword === '') {
      db.collection('users').doc(this.state.usuario[0].id).update({
        inputUsername: inputUsername,
        inputBio: inputBio
      }).then(() => {
        this.props.navigation.navigate("Profile");
      });
    } else {
      console.log(inputPassword);
      firebase.auth().currentUser.updatePassword(inputPassword)
        .then(() => {
          db.collection('users').doc(this.state.usuario[0].id).update({
            inputUsername: inputUsername,
            inputBio: inputBio
          }).then(() => {
            this.props.navigation.navigate("Login");
          }).catch((error) => {
            console.log(error);
            this.setState({
              errorAlEditar: true
            });
          });
        });
    }
  }

  render() {
    console.log(this.state.usuario);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Edit Your Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          keyboardType="default"
          onChangeText={(texto) => this.setState({ inputPassword: texto })}
          value={this.state.inputPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="New Username"
          keyboardType="default"
          onChangeText={(texto) => this.setState({ inputUsername: texto })}
          value={this.state.inputUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="New Bio"
          keyboardType="default"
          onChangeText={(texto) => this.setState({ inputBio: texto })}
          value={this.state.inputBio}
        />

        <TouchableOpacity
          style={styles.button}

          onPress={() => this.actualizar(this.state.inputPassword, this.state.inputUsername, this.state.inputBio)}>
          <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
    
          {this.state.errorAlEditar == false ? <Text></Text> : <Text style={styles.errorText}>Deleting your profile requires a delicate operation. Log in again to proceed.</Text>}
    
        </View>
      )
    }
  }    

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 40
    },
    subtitle: {
      fontSize: 16,
      color: 'black',
      textAlign: 'center',
      marginHorizontal: 20,
      marginTop: 10
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 20,
      paddingHorizontal: 10,
      fontSize: 16,
    },
    button: {
      marginTop: 60,
      backgroundColor: '#3897f0',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold'
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 10,
      textAlign: 'center'
    },
    returnLink: {
      color: '#3897f0',
      fontSize: 14,
      marginTop: 20,
      fontWeight: 'bold',
    }
  });
  
  export default EditPerfil;