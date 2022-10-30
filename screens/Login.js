import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import firebase from "firebase";
import AuthLayout from "../components/AuthLayout";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(["null is not an object (evaluating '_snapshot$val.email')"]);
LogBox.ignoreLogs(["@firebase/database: FIREBASE WARNING"]);
LogBox.ignoreLogs(["Cannot load an empty url"]);
LogBox.ignoreLogs(["Require cycle: screens\PropertyInformation"]);
LogBox.ignoreLogs(["'tabBarOptions' is deprecated. Migrate the options to 'screenOptions' instead."]);
LogBox.ignoreLogs(["new NativeEventEmitter()` was called with a non-null argument without the required"]);
LogBox.ignoreAllLogs();//Ignore all log notifications


export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [accountNo, setIsAccountNo] = useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    getUserInfomation();
  }, []);

  const getUserInfomation = () => {
    const userId = firebase.auth().currentUser?.uid;
    firebase
      .database()
      .ref(`Users/${userId}`)
      .once("value", (snapshot) => {
        const { email, accountNo } = snapshot.val();
        setEmail(email);
        setIsAccountNo(accountNo);
      });
  };


  const onPressLogIn = () => {
    setIsLoading(true);
    if (email.length == 0 || password.length == 0) {
      alert("Please fill in all the fields");
      setIsLoading(false);
      return;
    } else {
      
      firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .then(() => {
          if ( email == "mbusozayo0@gmail.com" || email == "Mbusozayo0@gmail.com"  || email == "Name@name.com") {
            navigation.navigate("TabNavigation");
          } else {
            navigation.navigate("DrawerNavigation");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          alert(error);
        });
    }
    setTimeout(() => {setIsLoading(false)}, 1000);
  };

  return (
    <AuthLayout>
      <Text style={styles.loginText}>Login</Text>

      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Username</Text>
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

      <TouchableOpacity onPress={onPressLogIn} style={styles.buttonStyle}>
              {isLoading ? (
                <ActivityIndicator size={"large"} color="white" />
              ) : (
                <Text style={styles.buttonText}>login</Text>
              )}       
      </TouchableOpacity>
      <Text
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
        style={styles.registerText}
      >
        Forgot password
      </Text>
      <Text
        onPress={() => {
          navigation.navigate("Register");
        }}
        style={styles.registerText}
      >
        Create account
      </Text>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    // justifyContent:'center',

    alignItems: "center",
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    paddingTop: 70,
  },
  formContainer: {
    height: 90,
    width: "95%",
    // justifyContent:'center',
    // backgroundColor:"red",
    marginTop: 20,
    padding: 5,
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
    alignSelf: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
});
