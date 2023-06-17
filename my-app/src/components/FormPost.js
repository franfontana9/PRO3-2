import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';

export default class FormPost extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='Add description'
          value={this.props.stateDescripcion}
          onChangeText={(text) => this.props.actualizarDescripcion(text)}
          multiline={true}
          numberOfLines={5}
        />
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6495ED',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
