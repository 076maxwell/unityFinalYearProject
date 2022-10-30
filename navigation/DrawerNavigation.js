import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import firebase from "firebase";

import Home from "../screens/Home";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
        <Drawer.Screen name="Home" component={Home} />
      
    </Drawer.Navigator>
  );
}
