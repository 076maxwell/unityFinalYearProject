import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";

import firebase from "firebase";
import Layout from "../components/Layout";
import Header from "../components/Header";
import CheckMark from "../components/CheckMark";

import Dimensions from "../utilities/Dimensions";
function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;


export default function PostNotification({ navigation }) {
  const [meterNumber, setMeterNumber] = React.useState("");
  const [isPayingForElectricity, setIsPayingForElectricity] =
    React.useState(true);
  const [amount, setAmount] = React.useState("");

  const onPressPayNow = () => {
    if (meterNumber.length < 11 ) {
      alert("The meter number should be at least 11 characters long");
    } else if (containsSpecialChars(meterNumber)) {
      alert("Please enter a valid meter number");
    } else if (amount == "" || containsSpecialChars(amount)) {
      alert("Please enter a correct amount");
    } else {
      navigation.navigate("CardPayment", {
        meterNumber,
        isPayingForElectricity,
        amount,
      });
    }
  };

  return (
    <Layout>
      <Header navigation={navigation} title="Prepaid" />
      <TextInput
        style={styles.inputStyle}
        onChangeText={setMeterNumber}
        value={meterNumber}
        placeholder="meter Number"
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.inputStyle}
        onChangeText={setAmount}
        value={amount}
        placeholder="R0.00"
        keyboardType="number-pad"
      />
      <View style={styles.paymentType}>
        <TouchableOpacity
          onPress={() => setIsPayingForElectricity(true)}
          style={[
            styles.chooseType,
            {
              backgroundColor: isPayingForElectricity ? "blue" : "grey",
            },
          ]}
        >
          <Text style={styles.buttonText}>Electricity</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsPayingForElectricity(false)}
          style={[
            styles.chooseType,
            {
              backgroundColor: isPayingForElectricity ? "grey" : "blue",
            },
          ]}
        >
          <Text style={styles.buttonText}>Water</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onPressPayNow} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
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
});
