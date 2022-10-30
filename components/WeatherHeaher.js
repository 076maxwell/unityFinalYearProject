import React from "react";
import {
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Dimensions from "../utilities/Dimensions";
import { useNavigation } from "@react-navigation/native";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function Header({ title }) {

  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIconHolder}
      >
        {Platform.OS === "android" ? (
          <Ionicons name="arrow-back-outline" size={30} color="lightgray" />
        ) : (
          <Ionicons name="chevron-back" size={30} color="#0000fe" />
        )}
      </TouchableOpacity>
      <Text style={styles.headerText} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#3b7be3",
    height: DEVICE_HEIGHT * 0.07,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
  },

  backIconHolder: {
    // backgroundColor: "red",
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    position: "absolute",
  },
  headerText: {
    color: "lightgray",
    fontWeight: "bold",
    fontSize: 20,
  },
});
