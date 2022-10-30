import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

import Layout from "../components/Layout";
import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

const Item = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemHeaderContainer}>
      <Text style={styles.title}>{item.notificationHeader}</Text>
    </View>
    <View style={styles.itemMessageContainer}>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>{item.date}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  </View>
);

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getNotofications();
  }, []);

  const getNotofications = () => {
    firebase
      .database()
      .ref(`Posts`)
      .on("value", (snapshot) => {
        const notifications = Object.values(snapshot.val()); //Convert object of objects into array of objects
        setPosts(notifications.sort((a, b) => (a.postId < b.postId ? 1 : -1)));
      });
  };

  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <Layout>
      <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.menuIconHolder}
          >
            <Ionicons name="menu" size={30} color="#407ad6" />
          </TouchableOpacity>
          <Text style={styles.headerText} numberOfLines={1}>
            Notification Center
          </Text>
      </View>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.postId}
        style={{
          padding: 10,
          backgroundColor: "#f2f2f2",
        }}
      />
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
  headerContainer: {
    // backgroundColor: "red",
    height: DEVICE_HEIGHT * 0.1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
    backgroundColor: "white",
    marginVertical: 6,
    borderRadius: 10,
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
