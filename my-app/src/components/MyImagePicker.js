import { Text, View, TouchableOpacity } from 'react-native';
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
        .then()
        .catch()

    }
    render() {
        return (
            <View>
            <Text>Carga una foto para tu perfil </Text> 
                <TouchableOpacity
                OnPress={()=> this.activarPicker()}>
                    <Text>
                    Cargar imagen de mi libreria
                    </Text>
                </TouchableOpacity>
             </View>
            
        )
      }

    }