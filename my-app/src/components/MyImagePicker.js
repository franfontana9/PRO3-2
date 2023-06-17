import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../firebase/config'

export default class MyImagePicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            imagenCargada: ''
        }
    }

    activarPicker() {
        ImagePicker.launchImageLibraryAsync()
        .then(imageData => this.setState({imagenCargada: imageData.assets[0].uri}))
        .catch( err => console.log(err))
    }

    aceptarImagen(){
        fetch(this.state.imagenCargada)
        .then(resp => resp.blob())
        .then(imagen => {
            let ref = storage.ref(`imgPerfil/${Date.now()}.jpeg`)
            ref.put(imagen)
            .then(()=> {
                ref.getDownloadURL()
                .then(url => this.props.actualizarFotoPerfil(url))
            })
        })
        .catch( err => console.log(err))
    }

    rechazarImagen(){
        this.setState({imagenCargada: ''})
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.imagenCargada !== '' ? 
                    <>
                        <Image 
                            source={{uri: this.state.imagenCargada}}
                            style={styles.img}
                        />
                        <TouchableOpacity
                            onPress={() => this.aceptarImagen()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Accept Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.rechazarImagen()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Reject Image</Text>
                        </TouchableOpacity>
                    </>
                 : 
                    <>
                        <Text style={styles.placeholderText}>Upload a Photo for Your Profile</Text>
                        <TouchableOpacity
                            onPress={() => this.activarPicker()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Load Image from My Library</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa'
    },
    img: {
        height: 200,
        width: 200,
        marginBottom: 20
    },
    placeholderText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#3f729b',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    }
})