import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Layout from "../components/Layout";
import Header from "../components/Header";
import Dimensions from "../utilities/Dimensions";


const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;
function containsSpecialChars(str) {
  const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);}

export default function MyAccount({ navigation }) {
  const [AccountNumber, setAccountNumber] = React.useState("");
  const [IdNumber, setIdNumber] = React.useState("");

  const onPressMyAccount = () => {
    if (AccountNumber == "1234567890") {
          if (IdNumber.length !== 13 || containsSpecialChars(IdNumber)){
              alert("Please enter a valid ID number");
              } else {
              navigation.navigate("TabNavigation", { 
              AccountNumber,
              IdNumber,
              });
              }
    } else {
        alert("Please enter a valid Account number");
  }
  };

  return (
    <Layout>
      <Header navigation={navigation} title="My Account" />
        <> 
          <TextInput
          style={styles.inputStyle}
          onChangeText={setAccountNumber}
          value={AccountNumber}
          placeholder="Account Number"
          keyboardType="number-pad"
        />
        <TextInput
            style={styles.inputStyle}
            onChangeText={setIdNumber}
            value={IdNumber}
            placeholder="ID Number"
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={onPressMyAccount} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>VERIFY</Text>
      </TouchableOpacity>
        </>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },

  inputStyle: {
    minHeight: DEVICE_HEIGHT * 0.06,
    width: SCREEN_WIDTH * 0.9,
    borderColor: "#407ad6",
    borderWidth: 1,
    color: "black",
    marginTop: 20,
    borderRadius: 10,
    padding: 5,
  },
  buttonStyle: {
    width: "70%",
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
});
