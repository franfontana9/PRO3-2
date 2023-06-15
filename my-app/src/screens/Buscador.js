import { Text, View, FlatList, TextInput, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db } from '../firebase/config';

export default class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: '',
      usuariosEmail: [],
      usuariosBackUp: [],
      modoFiltro: "email",
      usuariosNombre: [],
      Busqueda: ""
    };
  }

  componentDidMount() {
    db.collection('users').onSnapshot((docs) => {
      let arrayUsers = [];
      docs.forEach((doc) => {
        arrayUsers.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      this.setState({
        usuarios: arrayUsers,
        usuariosBackUp: arrayUsers,
      });
    });
  }

  metodoFiltrador(loQueVamosAFiltrar) {

    this.setState({ busqueda: loQueVamosAFiltrar });
   
      let arrayFiltrador1 = this.state.usuariosBackUp.filter((usuario) =>
      usuario.data.owner.toLowerCase().includes(loQueVamosAFiltrar.toLowerCase())
    );
    this.setState({ usuariosEmail: arrayFiltrador1 });
    
      let arrayFiltrador2 = this.state.usuariosBackUp.filter((usuario) =>
      usuario.data.inputUsername.toLowerCase().includes(loQueVamosAFiltrar.toLowerCase())
    );
    this.setState({ usuariosNombre: arrayFiltrador2 });
    
  
  }



  render() { 
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={(text) => this.metodoFiltrador(text)}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
        {this.state.busqueda == ""? <Text></Text>:
         <View style={styles.user1}>
         {this.state.usuariosEmail.length > 0?
          <FlatList
            data={this.state.usuariosEmail}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Text style={styles.user}>{item.data.inputUsername}</Text>}
            /> : 
            <Text style= {styles.noResult}> No results found Email</Text> 
            }
  
  {this.state.usuariosNombre.length > 0?
          <FlatList
            data={this.state.usuariosNombre}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Text style={styles.user}>{item.data.owner}</Text>}
            /> : 
            <Text style= {styles.noResult}> No results found Nombre</Text> 
            }
          </View>}
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  searchIcon: {
    fontSize: 20,
    marginLeft: 8,
  },
  user:{
    padding:10,
    margin:5,
    backgroundColor:'white',
    borderRadius:20,
    alignSelf:'center'
  },
  noResult:{
    color:'red',
    fontWeight: 'bold',
  }
});
