import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

import firebase from "firebase";
import Layout from "../components/Layout";
import Header from "../components/Header";
import CheckMark from "../components/CheckMark";
import SentMail from "../components/SentMail"

import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

export default function Inquiry({ navigation }) {
  const [InquiryHeader, setInquiryHeader] = React.useState("");
  const [messageEmail, setMessageEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  const onPressInquiry = () => {
    if (InquiryHeader.length < 3) {
      alert("The header should be at least 3 characters long");
    } else if (messageEmail == "") {
        alert("Please Enter a valid email address");
    } else if (message.length < 10) {
      alert("The description should be at least 10 characters long");
    } else {
      const userId = firebase.auth().currentUser?.uid;
      const postId = Date.now();

      const dateNow = new Date();
      const time = dateNow.toLocaleTimeString();
      const date = dateNow.toLocaleDateString();
      setIsLoading(true);

      const inquiryId = Date.now();

      firebase
        .database()
        .ref("Inquiry/" + inquiryId )
        .update({
          InquiryHeader,
          message,
          messageEmail,
          userId,
          time,
          date,
        })
        .then(() => {
          setIsDone(true);
          setTimeout(() => {
            navigation.goBack();
          }, 3000);
        })
        .catch((error) => {
          setIsLoading(true);
          alert(error);
        });
    }
  };

  return (
    <Layout>
      <Header navigation={navigation} title="Inquiry and Report" />
      {isDone ? (
        <SentMail />
      ) : (
        <>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setInquiryHeader}
            value={InquiryHeader}
            placeholder="Subject(Water, Roads, Electricity, etc)"
          />

            <TextInput
            style={styles.inputStyle}
            onChangeText={setMessageEmail}
            value={messageEmail}
            placeholder="Email Address you want us to contact you on"
          />

          <TextInput
            style={[styles.inputStyle, { minHeight: DEVICE_HEIGHT * 0.15 }]}
            onChangeText={setMessage}
            value={message}
            placeholder="Detailed description of the subject"
            multiline={true}
          />
          <TouchableOpacity onPress={onPressInquiry} style={styles.buttonStyle}>
            {isLoading ? (
              <ActivityIndicator size={"large"} color="white" />
            ) : (
              <Text style={styles.buttonText}>Send</Text>
            )}
          </TouchableOpacity>
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
