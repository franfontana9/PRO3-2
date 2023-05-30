import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'

const Tab = createBottomTabNavigator()

function HomeNav() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
    </Tab.Navigator>
    )
}

export default HomeNav