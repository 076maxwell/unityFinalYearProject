import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";

import firebase from "firebase";
import Layout from "../components/Layout";
import Header from "../components/Header";
import CheckMark from "../components/CheckMark";
import PrepaidModal from "../components/PrepaidModal"


import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);}

export default function CardPayment({ navigation }) {
  const [cardHolderName, setCardHolderName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);


  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData, setChooseData] = useState();
  const changeModalVisible = (bool) =>{
    setisModalVisible(bool);
  }

  const setData = (data) => {
    setisModalVisible(data)
  }


  const onPressPost = () => {
    if (cardNumber.length !== 16 || containsSpecialChars(cardNumber)) {
      alert("Please enter a valid card number");
    } else if (expiryDate == "" || containsSpecialChars(expiryDate)) {
      alert("Please enter a valid expiry date");
    } else if (cvv.length !== 3 || containsSpecialChars(cvv)) {
      alert("Please enter a valid cvv number");
    } else if (cardHolderName == "" || containsSpecialChars(cardHolderName)) {
      alert("Please enter a valid card holder name");
    } else {
      const userId = firebase.auth().currentUser?.uid;
      const paymentId = Date.now();
      const dateNow = new Date();
      const time = dateNow.toLocaleTimeString();
      const date = dateNow.toLocaleDateString();
      setIsLoading(true);
      setTimeout(() => {setisModalVisible(true);},  4000);
      firebase
        .database()
        .ref(`Payments/${paymentId}`)
        .update({
          cardNumber,
          expiryDate,
          cvv,
          cardHolderName,
          paymentId,
          userId,
          time,
          date,
        })
        .then(() => {
          changeModalVisible(true);
          setTimeout(() => { setIsDone(true); }, 2000);
          setTimeout(() => { navigation.goBack(); }, 4000);
        })
        .catch((error) => {
          setIsLoading(true);
          alert(error);
        });

        
    }
  };

  return (
    <Layout>
      <Header navigation={navigation} title="Once of Payment" />
      {isDone ? (
        <CheckMark />
      ) : (
        <>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setCardNumber}
            value={cardNumber}
            placeholder="Card Number"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputStyle}
            onChangeText={setExpiryDate}
            value={expiryDate}
            placeholder="Expiry Date"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputStyle}
            onChangeText={setCvv}
            value={cvv}
            placeholder="CVV"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputStyle}
            onChangeText={setCardHolderName}
            value={cardHolderName}
            placeholder="Card Holder Name"
          />
          <TouchableOpacity onPress={onPressPost} style={styles.buttonStyle}>
            {isLoading ? (
              <ActivityIndicator size={"large"} color="white" />
            ) : (
              <Text style={styles.buttonText}>Pay Now</Text>
            )}
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="fade"
            visible={isModalVisible}
            nRequestClose={() => changeModalVisible(false)}
            >
            <PrepaidModal 
            changeModalVisible={changeModalVisible}
            setData={setData}
           />
          </Modal>
                    
        </>
      )}
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
