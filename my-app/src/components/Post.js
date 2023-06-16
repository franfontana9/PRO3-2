import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: true,
      cantLikes: this.props.data.data.likes.length,
    };
  }

  componentDidMount() {
    if (this.props.data.data.likes) {
      let estaMiLike = this.props.data.data.likes.includes(auth.currentUser.email);
      if (estaMiLike === true) {
        this.setState({
          isLiked: true,
        });
      } else {
        this.setState({
          isLiked: false,
        });
      }
    }
  }

  unLiked() {
    db.collection('posts')
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then((resp) => {
        this.setState({
          isLiked: false,

        });
      })
      .catch((err) => console.log(err));
  }

  like() {
    db.collection('posts')
      .doc(this.props.data.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then((resp) => {
        this.setState({
          isLiked: true,
        });
      })
      .catch((err) => console.log(err));
  }

  botonLike() {
    if (this.state.miLike === true) {
      this.setState({
        miLike: false,
        cantLikes: this.state.cantLikes - 1,
      })
      this.disLike()
    } else {
      this.setState({
        miLike: true,
        cantLikes: this.state.cantLikes + 1,
      })
      this.likes()
    }
  }

  deletePost() {
    db.collection("posts")
      .doc(this.props.data.id)
      .delete()
      .then(() => {
        console.log('Post eliminado');
      }).catch((e) => {
        console.log(e);
      });
  }

  render() {
    console.log(this.props);

    return (
      <View style={styles.container}>

        <View>
          <TouchableOpacity
           style={styles.nombre}
            onPress={() =>
              this.props.navigation.navigate('ProfileAmigo', {
                email: this.props.data.data.owner,
              })
            }
          >
            <Text>{this.props.data.data.owner}</Text>
          </TouchableOpacity>
          {this.props.data.data.owner == auth.currentUser.email ?
            <TouchableOpacity onPress={() => this.deletePost()}>
              <FontAwesome name="trash-o" size={28} color="red" />
            </TouchableOpacity>
            : null}
        </View>

        <Image source={{ uri: this.props.data.data.foto }} style={styles.img} />

        <Text>{this.props.data.data.descripcion}</Text>

        <View style={styles.btnsContainer}>
          {this.state.isLiked ? (
            <TouchableOpacity style={styles.btnLike} onPress={() => this.unLiked()}>
              <FontAwesome name='heart' size={24} color='#ed4956' />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btnLike} onPress={() => this.like()}>
              <FontAwesome name='heart-o' size={24} color='black' />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.btnComentario}
            onPress={() => this.props.navigation.navigate('Comments', { id: this.props.data.id })}
          >
            <FontAwesome name="comment-o" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.cantidad}>{this.state.cantLikes} likes</Text>
        <Text style={styles.cantidad}>{this.props.data.data.comments.length} comentarios</Text>
        <FlatList
          data={this.props.data.data.comments.slice(-4)}
          keyExtractor={(data) => data.createdAt}
          renderItem={({ item }) => <Text    style={styles.coment} onPress={() => this.props.navigation.navigate('ProfileAmigo', { email: item.owner })}>{item.owner}:{item.comentario}</Text>}>
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  img: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  btnsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  btnLike: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  btnComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 2
  },
  cantidad: {
    fontSize: 12,
    color: 'black',
    marginTop: 3
  },
  nombre: {
    fontSize: 12,
    color: 'black',
    margin: 10,
    textAlign:'left',
  },
  coment: {
    fontSize: 10,

  }

})

export default Post