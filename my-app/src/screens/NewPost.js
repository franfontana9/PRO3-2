import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { db, auth } from '../firebase/config'
import CameraPosteos from '../components/CamaraPosteos'

class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descripcion: '',
            foto: '',
            likes: [],
            comments: []
        }
    }

    actualizarEstadoFoto(urlFoto){
        this.setState({
            foto: urlFoto
        })

    }

    actualizarDescripcion(text) {
        if (text != '') {
            this.setState({
                descripcion: text
            })
        }
    }

    crearPoste({ descripcion, foto, likes, comments }) {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            descripcion: descripcion,
            foto,
            comments,
            likes,
            createdAt: Date.now(),
        })
            .then((resp) => {
                this.props.navigation.navigate('Feed')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.foto === '' ?
                        <CameraPosteos 
                        actualizarEstadoFoto={
                            (urlFoto)=> this.actualizarEstadoFoto(urlFoto)
                        }
                        />
                        :
                        <>

                            <FormPost
                                stateDescripcion={this.state.descripcion}
                                actualizarDescripcion={(text) => this.actualizarDescripcion(text)}
                            />
                            <TouchableOpacity
                                onPress={() => this.crearPoste({
                                    descripcion: this.state.descripcion,
                                    foto: this.state.foto,
                                    likes: this.state.likes,
                                    comments: this.state.comments
                                })}
                            >
                                <Text>Enviar el posteo</Text>
                            </TouchableOpacity>

                        </>

                }
            


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default NewPost