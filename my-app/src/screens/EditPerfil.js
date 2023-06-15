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
                   <Text style={styles.titulo} > Editar Perfil </Text>
            <Text>Si no introducis una nueva contraseña, se mantedra la anterior CAMBIAR</Text>
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
              <Text style={styles.texto7}> Editar Perfil </Text>
            </TouchableOpacity>
            {this.state.errorAlEliminar == false ? <Text> </Text> :  <Text> Esta es una operación sensible, volvé a iniciar sesión para eliminar tu perfil</Text>}
           
<Text style={styles.texto8} onPress={() => this.props.navigation.navigate("Profile")}> Volve al perfil</Text>
         </View>
       
        )
    }
}


const styles = StyleSheet.create({
})
export default EditPerfil