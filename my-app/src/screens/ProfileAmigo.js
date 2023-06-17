import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db } from '../firebase/config';
import Posteos from '../components/Posteos';

export default class ProfileAmigo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoUser: '',
            posteos: []
        };
    }

    componentDidMount() {
        db.collection('users')
            .where('owner', '==', this.props.route.params.email)
            .onSnapshot(docs => {
                let arrUser = [];

                docs.forEach(doc => arrUser.push({
                    id: doc.id,
                    data: doc.data()
                }));

                this.setState({
                    infoUser: arrUser[0]
                }, () => console.log(this.state));
            });

        db.collection('posts')
            .where('owner', '==', this.props.route.params.email)
            .onSnapshot(docs => {
                let arrPosts = [];

                docs.forEach(doc => arrPosts.push({
                    id: doc.id,
                    data: doc.data()
                }));

                this.setState({
                    posteos: arrPosts
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.infoUser !== '' ? (
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{this.state.infoUser.data.owner}</Text>
                        <Text style={styles.createdAt}>{this.state.infoUser.data.createdAt}</Text>
                    </View>
                ) : null}
                <Posteos
                    data={this.state.posteos}
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333'
    },
    createdAt: {
        fontSize: 16,
        color: '#888'
    }
});
