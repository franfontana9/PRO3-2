import React, {Component} from 'react';
import {View,Text,StyleSheet} from 'react-native'
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

    render(){
        return (
        <View style={styles.container}>
                    <Camera
                        style={styles.camara}
                        type= {Camera.Constants.Type.back}
                        ref={metodosComponente => this.metodosCamara = metodosComponente}
                    />
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