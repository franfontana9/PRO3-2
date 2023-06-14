import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import FormPost from '../components/FormPost'
import { db, auth } from '../firebase/config'
import CamaraPosteos from '../components/CamaraPosteos'

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
        console.log('pasa por aqui')
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

    crearPosteo({ descripcion, foto, likes, comments }) {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            descripcion: descripcion,
            foto: foto,
            comments: comments,
            likes: likes,
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
                <Text></Text>
                {
                    this.state.foto === '' ?
                        <CamaraPosteos 
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
                                onPress={() => this.crearPosteo({
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