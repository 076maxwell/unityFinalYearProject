import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import AuthLayout from "../components/AuthLayout";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = React.useState("");

  const onPressReset = () => {
    if (email === "") {
      alert("Type your email address");
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert("Password reset link has been sent to your email");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <AuthLayout>
      <Text style={styles.loginText}>Reset Password</Text>

      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter Email"
        />
      </View>

      <TouchableOpacity onPress={onPressReset} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
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
