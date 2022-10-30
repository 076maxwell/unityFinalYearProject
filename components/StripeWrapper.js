import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import AccountPayment from "../screens/AccountPayment";

export default function StripeWrapper() {

  return (
    <View style={styles.container}>
      <StripeProvider publishableKey="pk_test_51LnhaJDNMT4Zmv32ayVsnLmOC2JVKN4DkW5H62UmTzRAOsfzcy2OqMqSUKQKvJGnfeIPeEhof9SKv0Hm8uGgOPiO00pES5AGyU">
        <AccountPayment />
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
});
