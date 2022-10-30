import React from 'react'

import CurrentScreen from './Current';
import CityWiseScreen from './CityWise'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createMaterialBottomTabNavigator();


export default function Weather() {
  return (
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: '#14428b' }} activeColor="black" >

      <Tab.Screen name="CityWise" component={CityWiseScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="weather-cloudy" color={color} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Current" component={CurrentScreen}
      options={{
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="information" color={color} size={26}/>
        ),
    }}/>
    </Tab.Navigator>
  );
}