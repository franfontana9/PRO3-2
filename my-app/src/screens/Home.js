import React, { Component } from 'react'
import { View , Text , TouchableOpacity , StyleSheet , Image, FlatList} from 'react-native'

const arrayConDatos = [
    {
        id: 1,
        nombre: 'Javier',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxG4lwrERNLql3JoJxBQK7afE43bjBnicSfA&usqp=CAU'
    },
    {
        id: 2,
        nombre: 'Facundo',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxG4lwrERNLql3JoJxBQK7afE43bjBnicSfA&usqp=CAU'
    },
    {
        id: 3,
        nombre: 'Juan',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxG4lwrERNLql3JoJxBQK7afE43bjBnicSfA&usqp=CAU'
    }
]


class Home extends Component {
    constructor(){
        super()

    }

    ejecucionCorta(){
        console.log('aaaa')
    }

    ejecucionLarga(){
        console.log('hola')
    }

  render() {
    return (
        <View>    
        <Text>
           DALEEE BOOOOOOOCA, DAAALE BOQUITA
        </Text>
        <TouchableOpacity 
        style={styles.button}
        onPress={()=>this.ejecucionCorta()} 
        onLongPress={()=>this.ejecucionLarga()}>
            <Text tyle={styles.textoBtn} >
                Acaa acaaa ca acaca c 
            </Text>
        </TouchableOpacity>
       
        <FlatList
        data={arrayConDatos}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=> 
        <View>
            <Text>{item.nombre}</Text>
                <Image
                    source={{uri: item.img}}
                    style={styles.img}
                    resizeMode='contain'
                />
        </View>
        }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'green',
        borderRadius: 20,
        borderWidth:2,
        textAlign:'center',
        padding:10
    },
    textoBtn:{
        color:'white'
    },
    img:{
        height:150
    }
})

export default Home