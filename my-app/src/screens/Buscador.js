import { Text, View} from 'react-native'
import React, {Component} from 'react'
import { db } from '../firebase/config'

export default class Buscador extends Component {
    construxtor(props){
        super(props)
        this.state={
            busqueda:'',
            usuarios:[]
        }

        this.componentDidMount(){
            db
            .collection('users')
            .onSnapshot(
                docs => {
                    let arrayUsers = []
                    docs.forEach(doc => {
                        arrayUsers.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })

                    this.setState({busqueda:arrayUsers})

                }
            )


        }
    }

    metodoQueFiltra(){

    }
    render() {
        return (
            <View>
                <Text>
                    Buscador
                </Text>
                <TextInput 
                placeholder='Ingresa tu email'
                onChangeText={(text)=> this.setState({busqueda:text})}
                />
            </View>
        )
    }
}