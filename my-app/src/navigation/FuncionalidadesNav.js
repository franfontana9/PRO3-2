import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feed from '../screens/Feed'
import Comments from '../screens/Comments'
import ProfileAmigo from '../screens/ProfileAmigo'
import EditPerfil from '../screens/EditPerfil'
const Stack = createNativeStackNavigator()

function FunctionalidadesNav() {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name='Feed'
            component={Feed}
            options={{
            headerShown:false}}
        />
        <Stack.Screen
            name='Comments'
            component={Comments}
        />
        <Stack.Screen
          name='Friend Profile'
          component={ProfileAmigo}
        />
        <Stack.Screen
          name='Back to Profile'
          component={EditPerfil}
        />
      </Stack.Navigator>
    )
}

export default FunctionalidadesNav