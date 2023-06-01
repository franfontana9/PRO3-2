import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';

import Home from '../screens/Home'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()

function HomeNav() {
  return (
    <Tab.Navigator >
        <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            headerShown:false,
            tabBarIcon: () => 
            <AntDesign name='home' color='green' size={24} />
        }}
        />
        <Tab.Screen 
            name='Profile'
            component={Profile}
            options={{
                tabBarIcon: ()=> 
                <AntDesign name='profile' color='red' size ={24} />
            }}    
        />
    </Tab.Navigator>
    )
}

export default HomeNav