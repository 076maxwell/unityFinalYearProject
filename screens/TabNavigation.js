import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Layout from "../components/Layout";
import Dimensions from "../utilities/Dimensions"; 
import Ionic from 'react-native-vector-icons/Ionicons'; 
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountInformation from './AccountInformation';
import PdfRequest from './PdfRequest';
import Documents from './Documents';
import NotificationCenter from './NotificationCenter';
import Chatbot from "./ChatBot";


const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

export default function TabNavigation(){

    const Tab = createBottomTabNavigator() 

  return (
            <Tab.Navigator labeled={false} barStyle={{ backgroundColor: '#407ad6', height: 50 }} activeColor="black" tabBarOptions={{ keyboardHidesTabBar: true, }} >
                <Tab.Screen name="My Account" component={AccountInformation}
                options={{ headerShown: false,
                 tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={26}/>
            ),
            }}/>
            
            <Tab.Screen name="NotificationCenter" component={NotificationCenter}
                options={{ headerShown: false,
                 tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26}/>
            ),
            }}/>
            <Tab.Screen name="Document" component={Documents}
                options={{ headerShown: false,
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="file" color={color} size={26}/>
            ),
            }}/>
            <Tab.Screen name="Let's Chat" component={Chatbot}
                options={{ headerShown: false,
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="chat" color={color} size={26}/>
            ),
            }}/>

            </Tab.Navigator>
          )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});


