import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import AuthLayout from "../components/AuthLayout";
import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

const firebaseConfig = {
  apiKey: "AIzaSyCoUUyvl1qxYnuvLFsKEauoqcyc9ShL8Lw",
  authDomain: "unity-8c2f2.firebaseapp.com",
  databaseURL: "https://unity-8c2f2-default-rtdb.firebaseio.com",
  projectId: "unity-8c2f2",
  storageBucket: "unity-8c2f2.appspot.com",
  messagingSenderId: "834459006498",
  appId: "1:834459006498:web:e50f251b74d450ae007c7b",
  measurementId: "G-88ERR4522Y",
};

firebase.initializeApp(firebaseConfig);


function containsSpecialCharsWthNumbers(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0123456789]/;
  return specialChars.test(str);}

export default function Register({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullNames, setFullNames] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);

  const onPressSignUp = () => {
    if (lastName === "" || containsSpecialCharsWthNumbers(lastName)) {
      alert("Invalid: Please enter last name before proceeding");
    } else if (fullNames === "" || containsSpecialCharsWthNumbers(fullNames)) {
      alert("Invalid: You must enter full name(s)");
    } else if (phoneNumber === "") {
      alert("You must enter phone number");
    } else if (email === "") {
      alert("You must enter a valid email address");
    } else if (password === "") {
      alert("Please create your new password of at least 6 characters");
    } else if (password.length < 6) {
      alert("Password should be more than 6 characters");
    } else if (repeatPassword === "") {
      alert("Enter Confirm password");
    } else if (password !== repeatPassword) {
      alert("Passwords do not match");
    } else if (phoneNumber.length !== 10) {
      alert("Phone number length must be 10");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then(() => {
          firebase
            .database()
            .ref("Users/" + firebase.auth().currentUser.uid)
            .update({
              fullNames,
              lastName,
              email,
              password,
              phoneNumber,
              isAdmin,
            });
          navigation.navigate("DrawerNavigation");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
      <AuthLayout>
        <Text style={styles.loginText}>Register</Text>
        <Text style={styles.registerText}>
          Please fill in this form to create an account
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Last Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Last Name"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Full names(s)</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFullNames}
            value={fullNames}
            placeholder="Enter Full Names"
          />
        </View>

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

        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter Email"
          />
        </View>

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

        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Repeat Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setRepeatPassword}
            value={repeatPassword}
            placeholder="Enter Password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={onPressSignUp} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Register Now</Text>
        </TouchableOpacity>

        <Text
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.registerText}
        >
          Already have an account? Sign in
        </Text>
      </AuthLayout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    // justifyContent:'center',

    // alignItems:"center"
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    paddingTop: 70,
    marginLeft: 15,
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
    alignSelf: "center",
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
});
