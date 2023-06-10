import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Feed from '../screens/Feed'
import Comments from '../screens/Comments'
const Stack = createNativeStackNavigator()

function FunctionalidadesNav() {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name='Feed'
            component={Feed}
        />
        <Stack.Screen
            name='Comments'
            component={Comments}
        />
      </Stack.Navigator>
    )
}

export default FunctionalidadesNav