import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'
import Posteos from '../components/Posteos'

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let arrayDocs = []
        docs.forEach(docs =>
          arrayDocs.push({
            id: docs.id,
            data: docs.data()
          })
        )
        console.log(arrayDocs)
        this.setState({
          posts: arrayDocs
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.welcomeText}>Bienvenidos a IG</Text>
          <Text style={styles.postText}>Mira todos los posteos!</Text>
        </View>
        <Posteos data={this.state.posts} navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    alignItems: 'center',
    marginTop: 40
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  postText: {
    fontSize: 18
  }
})

export default Feed
