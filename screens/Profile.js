import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, TouchableOpacity, Pressable, ScrollView, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import DatePicker from "expo-datepicker";
import Layout from "../components/Layout";
import Header from "../components/Header";
import KeyboardAvoidingComponent from "../components/KeyboardAvoidingComponent";
import { Component } from 'react';
import firebase from "firebase";
import React from "react";

import Dimensions from "../utilities/Dimensions";
import { useNavigation } from "@react-navigation/native";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);}

  export default function Profile() {
    const navigation = useNavigation();


    const [email, setEmail] = useState("email@domain.com");
    const [fullNames, setFullNames] = useState("Full names");
    const [lastName, setLastName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = React.useState("");
    const [repeatPassword, setRepeatPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);


    const onPressUpdate = () => {
        const userId = firebase.auth().currentUser?.uid;
        if (lastName === "" || containsSpecialChars(lastName) || typeof lastName !== "string") {
          alert("Please enter valid last name before proceeding");
        } else if (fullNames === "" || containsSpecialChars(fullNames) || typeof fullNames !== "string") {
          alert("You must enter valid full name(s)");
        } else if (phoneNumber === "" || containsSpecialChars(phoneNumber)) {
          alert("You must enter a valid phone number");
        } else if (email === "") {
          alert("You must enter a valid email address");
        } else if (password === "") {
          alert("Please create your new password of at least 6 characters");
        } else if (password.length < 6) {
          alert("Password should be more than 6 characters");
        } else if (phoneNumber.length !== 10) {
          alert("Phone number length must be 10");
        } else {
          setIsLoading(true);
          firebase
            .database()
            .ref(`Users/${userId}`)
            .update({
              fullNames,
              lastName,
              email,
              password,
              phoneNumber,
              isAdmin: Boolean = false,
                    })
            .then(() => {
                firebase
                navigation.goBack();
                setIsLoading(false);
              })
            .catch((error) => {
          alert(error.message);
        });
    }
  }
  
    useEffect(() => {
      getUserInfomation();
    }, []);
  
    const getUserInfomation = () => {
      const userId = firebase.auth().currentUser?.uid;
      firebase
        .database()
        .ref(`Users/${userId}`)
        .once("value", (snapshot) => {
          const { email, fullNames, lastName, isAdmin, phoneNumber } = snapshot.val();
          setFullNames(`${fullNames}`);
          setLastName(lastName);
          setEmail(email);
          setIsAdmin(isAdmin);
          setPhoneNumber(phoneNumber);
        });
    };
      return (
        <Layout>  
            <Header navigation={navigation} title="Edit Profile" />
            <KeyboardAvoidingView behavior="position" style={{ flex: 1}}>
              <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                   
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                
                  <View style={styles.container}>
                      <View style={styles.header}>
                          <View style={styles.headerContent}>
                              <Image style={styles.avatar}
                                source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
              
                              <Text style={styles.name}>{fullNames} {lastName}</Text>
                              <Text style={styles.userInfo}>{email}</Text>
                              <Text style={styles.userInfo}></Text>
                          </View>
                        </View>
  
                  <View style={styles.body}> 

                  <View style={styles.item}>
                      <View style={styles.formContainer}>
                        <Text style={styles.headerText}>Last Name</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={setLastName}
                          value={lastName}
                          placeholder="Last name"
                        />
                      </View>
                    </View>
                    <View style={styles.item}>
                      <View style={styles.formContainer}>
                        <Text style={styles.headerText}>Full names(s)</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={setFullNames}
                          placeholder={fullNames}
                          value={fullNames}
                        />
                      </View>
                    </View>
                    <View style={styles.item}>
                    <View style={styles.formContainer}>
                      <Text style={styles.headerText}>Email</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Email"
                          onChangeText={setEmail}
                          value={email}
                          
                        />
                    </View>
                    </View>
                    <View style={styles.item}>
                    <View style={styles.formContainer}>
                      <Text style={styles.headerText}>Phone Number</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={setPhoneNumber}
                          value={phoneNumber}
                          placeholder="Enter Phone Number"
                          keyboardType="numeric"
                        />
                    </View>
                      
                    </View>
                    <View style={styles.item}>
                    <View style={styles.formContainer}>
                    <Text style={styles.headerText}>Password</Text>
                      <TextInput
                          style={styles.input}
                          onChangeText={setPassword}
                          value={password}
                          placeholder="Enter Password"
                          secureTextEntry
                        />
                    </View>
                    </View>

                    <TouchableOpacity onPress={onPressUpdate} style={styles.buttonStyle}>
                    {isLoading ? (
                          <ActivityIndicator size={"large"} color="white" />
                        ) : (
                          <Text style={styles.buttonText}>Update</Text>
                        )}
                      
                    </TouchableOpacity>
                  </View>
            </View>
        </TouchableWithoutFeedback>
        </ScrollView>
        </KeyboardAvoidingView>
        </Layout>
      );
  }
  
  




const styles = StyleSheet.create({
    container: {
      height: "100%",
      width: "100%", 
    },

  inputStyle: {
    minHeight: DEVICE_HEIGHT * 0.06,
    width: SCREEN_WIDTH * 0.9,
    borderColor: "#407ad6",
    borderWidth: 1,
    color: "black",
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
  },
  headerContent:{
    alignItems: "center",
  },
  formContainer: {
    height: DEVICE_HEIGHT * 0.07,
    width: "95%",
    // justifyContent:'center',
    // backgroundColor:"red",
    marginTop: 20,
    padding: 5,
    marginLeft: 15,
  },
  headerText: {
    fontWeight: "700",
    fontSize: 20,
    color: "white",
  },
  input: {
    height: "70%",
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    color: "white",
  },
  buttonStyle: {
    width: "70%",
    height: 55,
    backgroundColor: "#407ad6",
    borderRadius: 50,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  registerText: {
    color: "white",
    fontSize: 17,
    marginLeft: 15,
  },
  registerText: {
    color: "white",
    alignSelf: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonStyle: {
    width: "80%",
    height: DEVICE_HEIGHT * 0.065,
    backgroundColor: "#407ad6",
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  paymentType: {
    width: "95%",
    height: DEVICE_HEIGHT * 0.065,
    // backgroundColor: "red",
    marginTop: 30,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  chooseType: {
    width: "45%",
    height: "100%",
    backgroundColor: "#407ad6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  avatar: {
    width: SCREEN_WIDTH * 0.4,
    height: DEVICE_HEIGHT * 0.17,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignItems: 'center',
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    flex: 1,
    backgroundColor: "#2555a1",
    height:DEVICE_HEIGHT * 1,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  }
});
