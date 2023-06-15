import React, { Component } from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet} from 'react-native';  
import {auth, db} from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore";

class EditPerfil extends Component {
    constructor() {
        super()
        this.state = {
            usuario:[],
            inputPassword:'',
            errorAlEditar:false,
          errores:''
            }
    }
    componentDidMount() {
       
        db.collection('users').where('owner','==', auth.currentUser.email).onSnapshot(
            (docs)=>{
            let user =[]
            docs.forEach((doc)=>{
                user.push({
                    id:doc.id, 
                    data:doc.data(), 
                })
            })
            this.setState({
             usuario:user,
             inputUsername:user[0].data.inputUsername,
             inputBio:user[0].data.inputBio
            })
            }
        )
    }
    actualizar(inputPassword,inputUsername,inputBio) {
      if ( inputPassword=='') {
        db.collection('users').doc(this.state.usuario[0].id).update({
            inputUsername: inputUsername,
            inputBio:inputBio
        }) .then(()=>{
            this.props.navigation.navigate("Profile")
        })
      } else {
        console.log(inputPassword);
        firebase.auth().currentUser.updatePassword(inputPassword)
        .then(()=>{
            db.collection('users').doc(this.state.usuario[0].id).update({
                inputUsername: inputUsername,
                inputBio:inputBio
            }) .then(()=>{
                this.props.navigation.navigate("Login")
            }) 
            .catch((error)=>{
                console.log(error);
                this.setState({
                    errorAlEditar: true
                })  
        })
    })
      }
    }
   
    render(){
        console.log(this.state.usuario);
        return(
            <View style={styles.contenedor}>
                   <Text style={styles.titulo} > Edit Profile </Text>
                   <Text style={styles.texto5}>If you don't enter a new password, the previous one will remain UNCHANGED.</Text>
                  <TextInput style={styles.texto2}
             placeholder='password' 
             keyboardType='password'
             onChangeText={texto=>this.setState({inputPassword:texto})}
             value= {this.state.inputPassword}
             />
               <TextInput  style={styles.texto3}
             placeholder='username' 
             keyboardType='default'
             onChangeText={texto=>this.setState({inputUsername:texto})}
             value= {this.state?.inputUsername}
             />
               <TextInput style={styles.texto4}
             placeholder='bio' 
             keyboardType='default'
             onChangeText={texto=>this.setState({inputBio:texto})}
             value= {this.state?.inputBio}
             />
               
        
              <  TouchableOpacity onPress={()=>this.actualizar(this.state.inputPassword,this.state.inputUsername,this.state.inputBio)}> 
              <Text style={styles.texto7}> Edit Profile </Text>
            </TouchableOpacity>
            {this.state.errorAlEliminar == false ? <Text> </Text> :  <Text style={styles.texto6}>Deleting your profile requires a delicate operation. Log in again to proceed.</Text>}
           
<Text style={styles.texto8} onPress={() => this.props.navigation.navigate("Profile")}> Return to Profile</Text>
         </View>
       
        )
    }
}


const styles = StyleSheet.create({
    contenedor: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    texto2: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10,
    },
    texto3: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10,
    },
    texto4: {
      width: '80%',
      height: 100,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10,
      textAlignVertical: 'top',
    },
    texto5: {
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 10, 
      },
      texto6: {
        fontSize: 14,
        marginTop: 10,
        marginLeft: 10, 
      },
      
    texto7: {
      backgroundColor: '#007AFF',
      color: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      fontSize: 18,
      fontWeight: 'bold',
    },
    texto8: {
      marginTop: 20,
      color: '#007AFF',
      fontSize: 16,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });
  
export default EditPerfil