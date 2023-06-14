import { Text, View, FlatList, TextInput, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db } from '../firebase/config';

export default class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: '',
      usuarios: [],
      usuariosBackUp: [],
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
    let arrayFiltrador = this.state.usuariosBackUp.filter((usuario) =>
      usuario.data.owner.toLowerCase().includes(loQueVamosAFiltrar.toLowerCase())
    );
    this.setState({ usuarios: arrayFiltrador });
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
        <View style={styles.user1}>
        <FlatList
          data={this.state.usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text style={styles.user}>{item.data.owner}</Text>}
        />
        </View>
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
    
  }
});
