import { Text, View, TextInput, TouchableOpacity, StyleSheet, Touchable } from 'react-native'
import React, { Component } from 'react'


export default class FormPost extends Component {
  render() {
    return (
      <View>
        <TextInput
        style={styles.input}
        keyboardType='default'
        placeholder='Add description'
        value={this.props.stateDescripcion}
        onChangeText={(text)=> this.props.actualizarDescripcion(text)}
        multiline={true}
        rows={5}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth:1,
        borderColor:'#c3c3c3'
    }
})