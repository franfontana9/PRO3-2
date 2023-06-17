import React, { Component } from 'react'
import { Text, TouchableOpacity, View, FlatList, StyleSheet, Image } from 'react-native'
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
        <Text style={styles.reactGramText}>ReactGram</Text>
        </View>
        <Posteos data={this.state.posts} navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  image: {
    width: 200, 
    height: 100, 
    //resizeMode: 'contain', 
  },
  centered: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  postText: {
    fontSize: 18
  },

  reactGramText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10
  }
})

export default Feed
