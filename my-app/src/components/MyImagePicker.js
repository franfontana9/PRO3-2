import { Text, View, TouchableOpacity, Image } from 'react-native';
import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';


export default class MyImagePicker extends Component {
  constructor(props) {
      super(props)
      this.state = {
          imagenDeMiLibreria : ''
      }
  }

    activarPicker() {
        ImagePicker.launchImageLibraryAsync()
        .then(imageData => this.setState({imagenDeMiLibreria: imageData.assets[0].uri}) )
        .catch(err => console.log(err))

    }
    render() {
        return (
            <View>
            <Text>Carga una foto para tu perfil </Text> 
            {
                this.state.imagenCargada !== '' ?

                <>
                <Image
                source={{uri: this.state.imagenCargada}}  
                />
                <TouchableOpacity>
                    <Text>Aceptar Imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Rechazar imagen</Text>
                </TouchableOpacity>
                </>

                : 
                <>
                 <TouchableOpacity
                OnPress={()=> this.activarPicker()}>
                    <Text>
                    Cargar imagen de mi libreria
                    </Text>
                </TouchableOpacity>
                </>

            }
             </View>
            
        )
      }

    }