import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: true,
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

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ProfileAmigo', {
              email: this.props.data.data.owner,
            })
          }
        >
          <Text>{this.props.data.data.userName}</Text>
        </TouchableOpacity>

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
    padding:10,
  },
   btnComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
    marginBottom:2
  }

})

export default Post