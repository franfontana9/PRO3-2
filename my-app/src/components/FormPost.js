import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#3897f1',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
