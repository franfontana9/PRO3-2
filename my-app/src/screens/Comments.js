import { Text, View, FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import ComentariosForm from '../components/Comentarios';
import { db } from '../firebase/config';
import { FontAwesome } from "@expo/vector-icons";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }
  
  componentDidMount() {
    db.collection('posts')
      .doc(this.props.route.params.id)
      .onSnapshot((doc) => {
        this.setState({
          data: doc.data(),
          comentarios: doc.data().comments.sort((a, b) => a.createdAt - b.createdAt).reverse()
        }, () => console.log(this.state.data));
      });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data.comments}
          keyExtractor={(item) => item.createdAt.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <FontAwesome name="user" size={24} color="#D8E7EB" />
              <Text onPress={() => this.props.navigation.navigate('ProfileAmigo', { email: item.owner })}>
                {item.owner}: {item.comentario}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text>There are no comments yet. Be the first to comment!</Text>
            </View>
          )}
        />
        <ComentariosForm idPost={this.props.route.params.id} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    color: 'white'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
