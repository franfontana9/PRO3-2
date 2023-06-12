import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Image} from 'react-native'
import { Camera } from 'expo-camera'

export default class CamaraPosteos extends Component {
    constructor(props){
        super(props)
        this.state = {
            fotoTomada : '',
            mostrarCamara: false,
        }
        this.metodosDeCamara =  null
    }

    componentDidMount(){
        Camera.getCameraPermissionsAsync()
        .then(resp => this.setState({ mostrarCamara: true }))
        .catch(err => console.log(err))
    }

    tomarFoto(){
        this.metodosCamara.takePictureAsync()
        .then(fotoEnMemoria => {
            this.setState({
                fotoTomada: fotoEnMemoria.uri,
                mostrarCamara: false
            })
        })
        .catch(err => console.log)
        
    }

    render(){
        return (
        <View style={styles.container}>
            {
                this.state.mostrarCamara && this.state.fotoTomada === '' ? 
                <>
                                  <Camera
                        style={styles.camara}
                        type= {Camera.Constants.Type.back}
                        ref={metodosComponente => this.metodosCamara = metodosComponente}
                    />
                    <TouchableOpacity Onpress= {() => this.tomarFoto()}>
                    
                        <Text> 
                            Tomar foto
                        </Text>
                    </TouchableOpacity>
                </>
                    
                    : this.state.mostrarCamara === false && this.state.fotoTomada !== ''?
                    <>
                    <Image 
                    source={{uri: this.state.fotoTomada}}
                    style={styles.img}
                    />
                    <View>
                        <TouchableOpacity> 
                            <Text>
                                Aceptar foto
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity> 
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