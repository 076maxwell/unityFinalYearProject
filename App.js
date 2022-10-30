import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Login from "./screens/Login";
import Payment from "./screens/Payment";
import Register from "./screens/Register";
import ForgotPassword from "./screens/ForgotPassword";
import PostNotification from "./screens/PostNotification";
import CardPayment from "./screens/CardPayment";
import DrawerNavigation from "./navigation/DrawerNavigation";
import Users from "./screens/Users";
import Profile from "./screens/Profile";
import MyAccount from "./screens/MyAccount";
import AccountInformation from "./screens/AccountInformation";
import AccountPayment from "./screens/AccountPayment";
import Weather from "./screens/Weather"
import PdfRequest from "./screens/PdfRequest";
import TabNavigation from "./screens/TabNavigation";
import ChatBot from "./screens/ChatBot";
import Inquiry from "./screens/Inquiry";
import PropertyInformation from "./screens/PropertyInformation";
import KeyboardAvoidingComponent from "./components/KeyboardAvoidingComponent";
import SimpleModal from "./components/SimpleModal";
import PrepaidModal from "./components/PrepaidModal";
import StripeWrapper from "./components/StripeWrapper";
import CityWise from "./screens/CityWise";
import DownloadModal from "./components/DownloadModal";
import LogFault from "./screens/LogFault";
import ProofOfResidence from "./screens/ProofOfResidence";
import AnonymousReport from "./screens/AnonymousReport";
import GeneralReport from "./screens/GeneralReport";


const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen name="Login" component={Login} screenOptions={{headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="CityWise" component={CityWise} screenOptions={{headerShown: false }} />
        <Stack.Screen name="AccountPayment" component={AccountPayment} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="PostNotification" component={PostNotification} />
        <Stack.Screen name="CardPayment" component={CardPayment} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
        <Stack.Screen name="AccountInformation" component={AccountInformation} />
        <Stack.Screen name="Weather" component={Weather} screenOptions={{headerShown: false }}/>
        <Stack.Screen name="PdfRequest" component={PdfRequest} screenOptions={{headerShown: false }} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="ChatBot" component={ChatBot} />
        <Stack.Screen name="Inquiry" component={Inquiry} />
        <Stack.Screen name="PropertyInformation" component={PropertyInformation} />
        <Stack.Screen name="SimpleModal" component={SimpleModal} />
        <Stack.Screen name="DownloadModal" component={DownloadModal} />
        <Stack.Screen name="PrepaidModal" component={PrepaidModal} />
        <Stack.Screen name="KeyboardAvoidingComponent" component={KeyboardAvoidingComponent} />
        <Stack.Screen name="StripeWrapper" component={StripeWrapper} />
        <Stack.Screen name="LogFault" component={LogFault} />
        <Stack.Screen name="ProofOfResidence" component={ProofOfResidence} />
        <Stack.Screen name="AnonymousReport" component={AnonymousReport} />
        <Stack.Screen name="GeneralReport" component={GeneralReport} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
