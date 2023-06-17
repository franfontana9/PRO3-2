import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import MyImagePicker from '../components/MyImagePicker'
import { db } from '../firebase/config'

export default class InfoAdicionalUser extends Component {
    constructor(props){
        super(props)
        this.state ={
            fotoDePerfil:''
        }
    }

    actualizarEstadoFotoDePerfil(url){
        this.setState({fotoDePerfil: url})
    }

    actualizarDocDelUsuario(){
        console.log(this.props.route.params.docId)
        db
        .collection('users')
        .doc(this.props.route.params.docId)
        .update({
            fotoPerfil: this.state.fotoDePerfil
        })
        .then(resp => {
            this.props.navigation.navigate('HomeNav')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <MyImagePicker actualizarFotoPerfil={(url)=> this.actualizarEstadoFotoDePerfil(url)} />
                {this.state.fotoDePerfil !== '' ? (
                    <TouchableOpacity
                        onPress={() => this.actualizarDocDelUsuario()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Add Profile Photo</Text>
                    </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Feed')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>
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