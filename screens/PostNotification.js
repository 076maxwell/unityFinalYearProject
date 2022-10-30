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

import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

export default function PostNotification({ navigation }) {
  const [notificationHeader, setNotificationHeader] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  const onPressPost = () => {
    if (notificationHeader.length < 3) {
      alert("The header should be at least 3 characters long");
    } else if (message.length < 10) {
      alert("The message should be at least 10 characters long");
    } else {
      const userId = firebase.auth().currentUser?.uid;
      const postId = Date.now();

      const dateNow = new Date();
      const time = dateNow.toLocaleTimeString();
      const date = dateNow.toLocaleDateString();
      setIsLoading(true);
      
      firebase
        .database()
        .ref(`Posts/${postId}`)
        .update({
          notificationHeader,
          message,
          postId,
          userId,
          time,
          date,
        })
        .then(() => {
          setIsDone(true);
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        })
        .catch((error) => {
          setIsLoading(true);
          alert(error);
        });
    }
  };

  return (
    <Layout>
      <Header navigation={navigation} title="Post Notification" />
      {isDone ? (
        <CheckMark />
      ) : (
        <>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setNotificationHeader}
            value={notificationHeader}
            placeholder="Title"
          />

          <TextInput
            style={[styles.inputStyle, { minHeight: DEVICE_HEIGHT * 0.15 }]}
            onChangeText={setMessage}
            value={message}
            placeholder="Message"
            multiline={true}
          />
          <TouchableOpacity onPress={onPressPost} style={styles.buttonStyle}>
            {isLoading ? (
              <ActivityIndicator size={"large"} color="white" />
            ) : (
              <Text style={styles.buttonText}>Post</Text>
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
