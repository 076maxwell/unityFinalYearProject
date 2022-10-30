import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
  Vibration,
  Alert,
} from "react-native";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase";

import Layout from "../components/Layout";
import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

export default function CustomDrawer({ navigation }) {
  const [email, setEmail] = useState("email@domain.com");
  const [fullNames, setFullNames] = useState("Full Names");
  const [isAdmin, setIsAdmin] = useState(false);
  const [accountNo, setIsAccountNo] = useState(false);

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
        setIsAdmin(isAdmin);
        setIsAccountNo(accountNo);
      });
  };

  return (
    <Layout>
      <ScrollView
        style={{
          height: DEVICE_HEIGHT * 0.8,
        }}
      >
        <View>
          <ImageBackground
            source={require("../assets/bg-image.webp")}
            style={styles.bgImageStyle}
          >
            <Text style={styles.nameText}>{fullNames}</Text>
            <Text style={styles.phoneNumberText}>{email}</Text>
          </ImageBackground>

          {isAdmin ? (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("PostNotification")}
                style={styles.option}
              >
                <View style={styles.iconTextName}>
                  <MaterialCommunityIcons
                    name="account"
                    size={29}
                    color="white"
                  />
                  <Text style={styles.optionName}>Post Notification </Text>
                </View>
                <View style={styles.arrow}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="white"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => alert("Function Coming Soon")}
                style={styles.option}
              >
                <View style={styles.iconTextName}>
                  <MaterialIcons
                    name="bookmark-border"
                    size={29}
                    color="white"
                  />
                  <Text style={styles.optionName}>Inquiry</Text>
                </View>
                <View style={styles.arrow}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => alert("Function Coming Soon")}
                style={styles.option}
              >
                <View style={styles.iconTextName}>
                  <MaterialIcons
                    name="bookmark-border"
                    size={29}
                    color="white"
                  />
                  <Text style={styles.optionName}>Reciepts</Text>
                </View>
                <View style={styles.arrow}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="white"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Users")}
                style={styles.option}
              >
                <View style={styles.iconTextName}>
                  <MaterialIcons name="info-outline" size={29} color="white" />
                  <Text style={styles.optionName}>Users</Text>
                </View>
                <View style={styles.arrow}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("MyAccount")}
                style={styles.option}
              >
                <View style={styles.iconTextName}>
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={29}
                    color="white"
                  />
                  <Text style={styles.optionName}>My Account </Text>
                </View>
                <View style={styles.arrow}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="white"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
                style={styles.option}
              >
                <View style={styles.iconTextName}>
                  <MaterialCommunityIcons
                    name="account"
                    size={29}
                    color="white"
                  />
                  <Text style={styles.optionName}>Profile</Text>
                </View>
                <View style={styles.arrow}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="white"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Payment")}
                style={styles.option}
              >
                <View style={styles.iconTextName}>
                  <MaterialIcons
                    name="bookmark-border"
                    size={29}
                    color="white"
                  />
                  <Text style={styles.optionName}>Prepaid Utilities</Text>
                </View>
                <View style={styles.arrow}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="white"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("CityWise")}
                style={styles.option}
              >
                <View style={styles.iconTextName}>
                  <MaterialCommunityIcons
                    name="weather-cloudy"
                    size={29}
                    color="white"
                  />
                  <Text style={styles.optionName}>Weather</Text>
                </View>
                <View style={styles.arrow}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="white"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Inquiry")}
                style={styles.option}
              >
                <View style={styles.iconTextName}>
                  <MaterialIcons name="info-outline" size={29} color="white" />
                  <Text style={styles.optionName}>Inquiry</Text>
                </View>
                <View style={styles.arrow}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
              
            </>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.option}
          >
            <View style={styles.iconTextName}>
              <MaterialCommunityIcons name="logout" size={29} color="white" />
              <Text style={styles.optionName}>Sign Out</Text>
            </View>
            <View style={styles.arrow}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingTop: STATUSBAR_HEIGHT,
    height: "100%",
    width: "100%",
  },
  bgImageStyle: {
    // backgroundColor: "#eb7a34",
    height: DEVICE_HEIGHT * 0.2,
    //height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    color: "grey",
    fontSize: 28,
    fontWeight: "bold",
  },
  phoneNumberText: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
  },

  option: {
    backgroundColor: "#407ad6",
    height: DEVICE_HEIGHT < 600 ? 35 : 40,
    width: "98%",
    marginTop: 5,
    flexDirection: "row",
    borderRadius: 5,
  },
  optionName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  iconTextName: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    width: "90%",
    height: "100%",
    //backgroundColor: "blue",
  },
  arrow: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
    height: "100%",
    //backgroundColor: "green",
  },
  driversCont: {
    backgroundColor: "#eb7a34",
    height: DEVICE_HEIGHT < 600 ? 100 : 130,
    width: SCREEN_WIDTH,
    width: "98%",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  bikeImg: {
    height: 100,
    width: 100,
  },
  stirBoyImg: {
    height: "99%",
    width: "99%",
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "center",
  },
  stirBoyCont: {
    marginTop: 5,
    backgroundColor: "#eb7a34",
    height: DEVICE_HEIGHT * 0.2,
    width: "98%",
  },
});
