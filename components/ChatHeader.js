import React from "react";
import {
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function Header({ title}) {
  return (
    <><StatusBar  backgroundColor="#407ad6" />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText} numberOfLines={1}>
            {title}
          </Text>
        </View></>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    height: DEVICE_HEIGHT * 0.12,
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
    justifyContent: 'flex-end',
    alignItems: "center",
    left: 0,
    position: "absolute",
    flex: 1,
    bottom: 9,
  },
  headerText: {
    color: "#407ad6",
    fontWeight: "bold",
    fontSize: 20,
    position: 'absolute', //Here is the trick
    bottom: 9, //Here is the trick
  },
});
