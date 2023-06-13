import { Text, View, FlatList, TextInput } from 'react-native';
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
      <View>
        <Text>Buscador</Text>
        <TextInput
          placeholder="Ingresa tu email"
          onChangeText={(text) => this.metodoFiltrador(text)}
        />
        <FlatList
          data={this.state.usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.data.owner}</Text>}
        />
      </View>
    );
  }
}
