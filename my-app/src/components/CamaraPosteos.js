import React, {Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
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
        .then(fotoTomo => {
            console.log(fotoTomada)
        })
        .catch(err => console.log)
        
    }

    render(){
        return (
        <View style={styles.container}>
            {
                this.state.mostrarCamara ? 
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
                    
                    :<text> No tienes permiso para usar la camara </text> 
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
       height: 250
   }
})