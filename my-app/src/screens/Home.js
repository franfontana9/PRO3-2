import React, {Component} from "react"
import {View,Text,TouchableOpacity} from 'react-native'

class Home extends Component {
    constructor(){
        super()
    }

    ejecutarConAccionCorta(){
        console.log('El usuario nos pide algo')
    }

    ejecutarConAccionLarga(){
        console.log('El usuario nos pide algo')
    }

    render(){
        return(
            <View>
                <Text> 
                    Aqui vamos a crear una Home
                </Text>
                <TouchableOpacity
                onPress={()=>this.ejecutarConAccionCorta()}
                onLongPress={()=>this.ejecutarConAccionLarga()}
                >
                    <Text>
                        Este texto suelto genera errores?
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Home