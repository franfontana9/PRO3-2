import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import FunctionalidadesNav from '../navigation/FuncionalidadesNav';
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost';
import Feed from '../screens/Feed';
import Buscador from '../screens/Buscador';


const Tab = createBottomTabNavigator()

function HomeNav() {
  return (
    <Tab.Navigator >
        <Tab.Screen 
        name='Feed' 
        component={FunctionalidadesNav}
        options={{
            headerShown:false,
            tabBarIcon: () => 
            <SimpleLineIcons name="home" size={24} color="black" /> 
    }}
        />
        <Tab.Screen
        name='NewPost'
        component={NewPost}
        options={{
            headerShown:false,
            tabBarIcon: () => 
            <AntDesign name="plus" size={24} color="black" />      
    }}
        />
        <Tab.Screen 
            name='Profile'
            component={Profile}
            options={{
                headerShown:false,
                tabBarIcon: ()=> 
                <AntDesign name="user" size={24} color="black" /> 
        }}    
        />

        <Tab.Screen
        name= 'Buscador'
        component={Buscador}
        />
        
    </Tab.Navigator>

    )
}

export default HomeNav