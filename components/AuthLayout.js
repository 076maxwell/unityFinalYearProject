import * as React from "react";
import { View, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

import genericStyles from "../utilities/Styles";

export default function AuthLayout(props) {
  return (
    <View style={genericStyles.iosStatusBarPainter}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("../assets/bg-Image.png")}
        style={[genericStyles.customSafeAreaView, { alignItems: "center" }]}
      >
        {props.children}
      </ImageBackground>
    </View>
  );
}
