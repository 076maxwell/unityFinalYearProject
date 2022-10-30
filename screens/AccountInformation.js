import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Layout from "../components/Layout";
import Dimensions from "../utilities/Dimensions";
import Profile from "../screens/Profile"
import firebase from "firebase";
import { FloatingAction } from "react-native-floating-action";
import AccountHeader from "../components/AccountHeader";


const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;
const Tab = createBottomTabNavigator();



export default function AccountInformation({ navigation }) {
  const [fullNames, setFullNames] = useState("Full Names");
  const [email, setEmail] = useState("email@domain.com");
  const [address, setAddress] = useState("")
  const [suburb, setSuburb] = useState("")
  const [property, setProperty] = useState([]);
  const [propertDescription, setPropertDescription] = useState("")
  const [propertyId, setPropertyId] = useState("")
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    getUserInfomation();
  }, []);

  const getUserInfomation = () => {
    const userId = firebase.auth().currentUser?.uid;
    firebase
      .database()
      .ref(`Users/${userId}`)
      .once("value", (snapshot) => {
        const { email, fullNames, lastName, isAdmin } = snapshot.val();
        setFullNames(`${fullNames} ${lastName}`);
        setEmail(email);
        setPropertDescription(propertDescription);
        setAddress(address);
      });
  };


  useEffect(() => {
    getPropertyInfo();
  }, []);

  const getPropertyInfo = () => {
    const userId = firebase.auth().currentUser?.uid;
    
    try {
      setLoaded(false);
      firebase
        .database()
        .ref(`Property/${userId}/${propertyId}`) 
        .once("value", (snapshot) => {
            //const { propertyId } = snapshot.val();
              //setPropertyId(propertyId)
            const PropertyInfo = Object.values(snapshot.val()); 
            setProperty(PropertyInfo.sort((a, b) => (b.propertyId < a.propertyId ? 1 : -1)));
            setLoaded(true);
            })
        .then(() => {
          setLoaded(true);
            }); 
            setTimeout(() => {
              setLoaded(true);;
            }, 1000);
        }
        catch (error) {
            console.log(error);
        }
  }; 

  const renderItem = ({ item }) => <Item item={item} />;

  const Item = ({ item }) => (

    <>
  
    <View style={{ flex: 1, alignItems: "center", }}>
        <TouchableOpacity
          options={{ Animation: 'slide_from_left' }}
          onPress={() => navigation.navigate("PropertyInformation")}
          style={{
            paddingHorizontal: 32,
            alignSelf: "center",
            alignItems: "center",
            marginTop: 20,
            backgroundColor: "#FFF",
            height: DEVICE_HEIGHT * 0.2,
            elevation: 3,
            width: SCREEN_WIDTH * 0.9,
            borderRadius: 16,
            backgroundColor: "#fafbfc",
          }}
        >

          <View
            style={{
              alignSelf: "center",
              flexDirection: "row",
              paddingTop: 10,
              alignSelf: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", }}>
              Property Information
            </Text>
          </View>
          <View
            style={{
              alignSelf: "center",
              flexDirection: "row",
              paddingTop: 5,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: "#14428b",
                fontSize: 13,
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              Address
            </Text>

            <Text
              style={{
                fontSize: 20,
                color: "#14428b",
                paddingHorizontal: 14,
              }}
            >
              {" "}
              - - - - - -
            </Text>
            <Text
              style={{
                alignItems: "center",
                alignSelf: "center",
                color: "#14428b",
                fontSize: 13,
              }}
            >
              {item.address}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: -5,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 9,
                alignSelf: "center",
                color: "#7c7cbf",
                paddingLeft: 150,
              }}
            >
              {item.suburb}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingTop: 5,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                alignItems: "center",
                alignSelf: "center",
                color: "#14428b",
                fontSize: 13,
              }}
            >
              Ownership
            </Text>

            <Text
              style={{
                fontSize: 20,
                color: "#14428b",
                paddingHorizontal: 14,
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              {" "}
              - - - - - -
            </Text>

            <Text
              style={{
                alignItems: "center",
                alignSelf: "center",
                color: "#14428b",
                fontSize: 13,
              }}
            >
              {fullNames}
            </Text>
          </View>

          <View style={{
            flexDirection: "row",
            marginTop: -5,
            alignItems: "center",
            alignSelf: "center",
          }}>
            <Text
              style={{
                alignSelf: "center",
                color: "#7c7cbf",
                fontSize: 10,
                paddingLeft: 150,
              }}
            >
              sole owner
            </Text>
          </View>


          <Text
            style={{
              fontSize: 13,
              marginRight: -5,
              marginVertical: 8,
              marginTop: -5,
              color: "#14428b",
              alignSelf: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            - - - - - - - - - - Description - - - - - - - - - - -
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginTop: -8,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{
              fontSize: 13,
              color: "#14428b",
            }}>
              {item.propertyDescription}
            </Text>
          </View>
        </TouchableOpacity>
      </View></>
  );


  const actions = [
  {
    text: "Log a Fault",
    icon: require("../assets/images/error-message.png"),
    name: "bt_fault",
    position: 1,
    
  },
  {
    text: "General Request",
    icon: require("../assets/images/request.png"),
    name: "bt_Report",
    position: 2
  },
  {
    text: "Report Anonymously",
    icon: require("../assets/images/anonymous.png"),
    name: "bt_Anonymously",
    position: 3
  },
  {
    text: "Sign Out",
    icon: require("../assets/images/logout.png"),
    name: "bt_SignOut",
    position: 4
  }
];


  return (
    <Layout>
        <AccountHeader title="My Account" />

        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hi there! {fullNames}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Icon name="account-circle" size={40} color="#407ad6" style={{ marginLeft: 85 }} />
          </TouchableOpacity>
        </View>

      <FlatList
          data={property}
          renderItem={renderItem}
          keyExtractor={(item) => item.propertyId}
          style={{
          padding: 10,
          marginBottom:15,
          backgroundColor: "white",
          }}
          />
      <FloatingAction
          margin={5}
          color={"#407ad6"}
          showBackground={false}
          actionsPaddingTopBottom={2}
          actions={actions}
          dismissKeyboardOnPress={true}
          distanceToEdge={{ vertical: 55, horizontal: 15 }}
          onPressItem={name => {
            if(name == "bt_fault") {navigation.navigate("LogFault")}
            else if (name == "bt_Report") {navigation.navigate("GeneralReport")}
            else if(name == "bt_Anonymously") {navigation.navigate("AnonymousReport")}
            else if(name == "bt_SignOut") {navigation.navigate("Login")}
            else {alert("Undefine action")}
          }}
          />
          </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    // backgroundColor: "red",
    height: DEVICE_HEIGHT * 0.1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  greeting: {
    width: SCREEN_WIDTH * 0.95,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: "center",
  },
  greetingText: { 
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },

  menuIconHolder: {
    // backgroundColor: "red",
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    position: "absolute",
  },
  headerText: {
    color: "#407ad6",
    fontWeight: "bold",
    fontSize: 20,
  },
  itemContainer: {
    minHeight: DEVICE_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.95,
    backgroundColor: "#f2f2f2",
    marginVertical: 6,
    padding: 10,
    elevation: 2,
  },
  itemHeaderContainer: {
    minHeight: DEVICE_HEIGHT * 0.04,
    width: "95%",
    borderBottomColor: "grey",
    borderBottomWidth: 0.6,
    justifyContent: "center",
    // alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  itemMessageContainer: {
    minHeight: DEVICE_HEIGHT * 0.06,
    width: "95%",
    // borderBottomColor: "grey",
    // borderBottomWidth: 0.6,
    justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  timeContainer: {
    minHeight: DEVICE_HEIGHT * 0.06,
    width: "95%",
    // borderBottomColor: "grey",
    // borderBottomWidth: 0.6,
    // justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    flexDirection: "row",
  },
  timeText: {
    color: "grey",
    marginHorizontal: 10,
  },
});
