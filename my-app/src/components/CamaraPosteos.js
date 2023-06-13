import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera'
import { storage } from '../firebase/config';

export default class CamaraPosteos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fotoTomada: '',
            mostrarCamara: false,
        }
        this.metodosCamara = null
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(resp => this.setState({ mostrarCamara: true }))
            .catch(err => console.log(err))
    }

    tomarFoto() {
        this.metodosCamara.takePictureAsync()
            .then(fotoEnMemoria => {
                this.setState({
                    fotoTomada: fotoEnMemoria.uri,
                    mostrarCamara: false
                })
            })
            .catch(err => console.log(err))

    }

    aceptarFoto() {
        fetch(this.state.fotoTomada)
            .then(resp => resp.blob())
            .then(imagen => {
                const ref = storage.ref(`fotos/${Date.now().jpg}`)
                ref.put(imagen)
                    .then(() => {
                        ref.getDownloadURL()
                            .then((url) => this.props.actualizarEstadoFoto(url))
                    })
            })
            .catch(err => console.log(err))
    }

    rechazarFoto() {
        this.setState({
            mostrarCamara: true,
            fotoTomada: ''
        })
    }


    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.mostrarCamara && this.state.fotoTomada === '' ?
                        <>
                            <Camera
                                style={styles.camara}
                                type={Camera.Constants.Type.back}
                                ref={metodosComponente => this.metodosCamara = metodosComponente}
                            />
                            <TouchableOpacity
                                onPress={() => this.tomarFoto()}>

                                <Text>
                                    Tomar foto
                                </Text>
                            </TouchableOpacity>
                        </>

                        : this.state.mostrarCamara === false && this.state.fotoTomada !== '' ?
                            <>
                                <Image
                                    source={{ uri: this.state.fotoTomada }}
                                    style={styles.img}
                                />
                                <View>
                                    <TouchableOpacity
                                        onPress={() => this.aceptarFoto()}>
                                        <Text>
                                            Aceptar foto
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.rechazarFoto()}>
                                        <Text>
                                            Rechazar foto
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>

                            :
                            <Text> No tienes permiso para usar la camara </Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camara: {
        flex: 1
    },
    img: {
        flex: 1
    }
})