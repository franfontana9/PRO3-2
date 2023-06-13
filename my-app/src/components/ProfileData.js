// import React, { Component } from 'react'
// import { Text, View, TextInput, TouchableOpacity, StyleSheet, Touchable } from 'react-native'
// import {auth} from '../firebase/config'

// class ProfileData extends Component {
//     logout(){
//         auth.signOut()
//         .then(resp=> this.props.navigation.navigate('Login'))
//         .catch(err=>console.log(err))
//     }

//   render() {
//     return (
//         <View>
//         <TouchableOpacity
//         onPress={()=> this.logout()}
//         >        
//             <Text>Logout</Text>
//         </TouchableOpacity>  
//         </View>       
//         )
//   }
// }


// export default ProfileData