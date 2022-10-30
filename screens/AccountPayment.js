import { useStripe } from "@stripe/stripe-react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert, 
  Image,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import firebase from "firebase";
import Layout from "../components/Layout";
import Header from "../components/Header";
import CheckMark from "../components/CheckMark";

import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;


    const AccountPayment = (props) => {

    const navigation = useNavigation();

    const [price, setPrice] = useState(50000);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isDone, setIsDone] = React.useState(false);
    const [totalCoins, setTotalCoins] = useState(1.91342865);
    const [quantity, setQuantity] = useState("");
    const [amount, setAmount] = useState(quantity);
    const stripe = useStripe();
    const SERVER_URL_LOCAL = "http://192.168.43.65:6000";
    const SERVER_URL_METRO = "http://10.6.119.85:6000";



    function containsSpecialChars(str) {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return specialChars.test(str);}

  // Update total (INR) on change in price or quantity
  useEffect(() => {
    setAmount(quantity);
  }, [quantity, price]);

  const onPressCard = async () => {
    handleClosePress();
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
    }, 2000);
    
    try {

      const finalAmount = parseInt(amount);
      const response = await fetch(`${SERVER_URL_LOCAL}/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coin: "Bitcoin",
          quantity: quantity,
          amount: finalAmount,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        return () => {Alert.alert(data.message); setIsDone(false);};
      }
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Payment",
      });
      if (initSheet.error) {
        // console.error(initSheet.error);
        return () => {Alert.alert(initSheet.error.message); setIsDone(false);};
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      });
      if (presentSheet.error) {
        // console.error(presentSheet.error);
        return () => {Alert.alert(presentSheet.error.message); setIsDone(false);};
      }
      Alert.alert("Payment successfully! Your account will be updated soon");
      navigation.navigate("PropertyInformation");
      setIsDone(false);

    } catch (err) {
      // console.error(err);
      Alert.alert("Payment failed! Please try again.");
      navigation.navigate("PropertyInformation");
      setIsDone(false);
    }
    
    setTimeout(() => {
      setIsDone(false);
    }, 2000);
    
    navigation.navigate("PropertyInformation");
    
  };

  // ref
  const bottomSheetModalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClosePress = () => bottomSheetModalRef.current.close()

  // variables
  const snapPoints = useMemo(() => ['79%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

      const onPressPay = () => {
        Keyboard.dismiss();

        if (quantity == "" || containsSpecialChars(quantity)) {
           alert("Invalid: Please enter a correct amount") 
        } else {
          handlePresentModalPress();
        }
      }

  const loadingScreen = () =>{
    return(
          <View style={[styles.container, {justifyContent: "center", alignItems: "center",}]}>
              <ActivityIndicator color='#407ad6' size={36} />
          </View>
    )
  }


  return (
    <StripeProvider publishableKey="pk_test_51LnhaJDNMT4Zmv32ayVsnLmOC2JVKN4DkW5H62UmTzRAOsfzcy2OqMqSUKQKvJGnfeIPeEhof9SKv0Hm8uGgOPiO00pES5AGyU"> 
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: isOpen ? '#00000090' : '#f4f4f4' }}>
      <Layout >         
            <Header navigation={navigation} title="Payment" />
            {isDone ? (
                        <>
                        <View style={{ flex:1, justifyContent: "center", alignItems: "center", }}>
                            <ActivityIndicator color='#407ad6' size={36} />
                        </View>
                        </>
                        
                      ) : (
                  <><View style={styles.formContainer}>
                    <Text style={styles.headerText}>Please enter amount</Text>
                    <Text style={[styles.headerText, { fontSize: 9, fontWeight: "normal" }]}>If extra amount is entered, it will be credited your account and used on the next payment</Text>
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={(e) => setQuantity(e)}
                      value={quantity}
                      placeholder="i.e 100.00"
                      keyboardType="number-pad" />
                  </View><TouchableOpacity onPress={onPressPay} style={styles.buttonStyle}>
                      <Text style={styles.buttonText}>Make Payment</Text>
                    </TouchableOpacity><BottomSheetModalProvider>
                      <BottomSheetModal
                        handleStyle={{ borderRadius: 10, backgroundColor: 'lightgrey' }}
                        ref={bottomSheetModalRef}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        onClose={() => setIsOpen(false)}
                        keyboardBlurBehavior={'restore'}
                        onChange={handleSheetChanges}
                      >
                        <View style={{ backgroundColor: '#f4f4f4' }}>
                          <Text style={styles.title}>Payment Options</Text>
                          <Text style={styles.subtitle}>How would you like to pay?</Text>
                          <TouchableOpacity style={styles.type} onPress={onPressCard}>
                            <View>
                              <Text style={styles.text}>Credit & Debit</Text>
                              <Image style={styles.image} source={require("../assets/majorCreditCardLogo.png")} />
                            </View>
                            <View>
                              <Ionicons name="arrow-forward" size={30} color="#00000090" style={{ marginRight: 20 }} />
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity style={[styles.type, { marginTop: 0, }]} onPress={() => { alert("Payment type unavailable at the moment"); handleClosePress(); } }>
                            <View>
                              <Text style={styles.text}>Instant EFT with PayFast</Text>
                              <Image style={styles.image} source={require("../assets/majorbanks.jpg")} />
                            </View>
                            <View>
                              <Ionicons name="arrow-forward" size={30} color="#00000090" style={{ marginRight: 20 }} />
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity style={[styles.type, { marginTop: 0, }]} onPress={() => { alert("Payment type unavailable at the moment"); handleClosePress(); } }>
                            <View>
                              <Text style={[styles.text,]}>Mobile Payment</Text>
                              <View style={{ flexDirection: 'row', }}>
                                <Image style={[styles.image, { width: "20%", height: 20, }]} source={require("../assets/pay_google_gpay_icon.png")} />
                                <Image style={[styles.image, { width: "20%", height: 20, }]} source={require("../assets/apple_logo_logos_pay_icon.png")} />
                              </View>
                            </View>
                            <View>
                              <Ionicons name="arrow-forward" size={30} color="#00000090" style={{ marginRight: 20 }} />
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity style={[styles.type, { marginTop: 0, }]} onPress={() => { alert("Payment type unavailable at the moment"); handleClosePress(); } }>
                            <View>
                              <Text style={styles.text}>Deposit</Text>
                              <View style={{ flexDirection: 'row', }}>
                                <Image style={[styles.image, { width: "15%", height: 20, }]} source={require("../assets/cash_money_payment_wallet_icon.png")} />
                                <Image style={[styles.image, { width: "17%", height: 20, }]} source={require("../assets/moneys_financial_layers_money_icon.png")} />
                              </View>
                            </View>
                            <View>
                              <Ionicons name="arrow-forward" size={30} color="#00000090" style={{ marginRight: 20 }} />
                            </View>

                          </TouchableOpacity>
                        </View>

                      </BottomSheetModal>
                    </BottomSheetModalProvider></>
                      )}
                    
                
                
        </Layout>
        </GestureHandlerRootView>
    </StripeProvider>
  );
}

export default AccountPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
    headerText: {
      fontWeight: "700",
      fontSize: 20,
      color: "black",
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
    marginTop: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  formContainer: {
    height: DEVICE_HEIGHT * 0.07,
    width: "95%",
    // justifyContent:'center',
    // backgroundColor:"red",
    marginTop: 20,
    padding: 5,
    marginLeft: 15,},
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
  title: {
      fontSize: 25,
      textAlign: "left",
      margin: 10,
      fontWeight: "bold",
  },
  subtitle: {
      fontSize: 18,
      textAlign: "left",
      marginLeft: 10,
      marginBottom: 10,

  },
  type:{
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection:"row",
      marginTop: 10,
      //width:"95%",
      borderWidth: 0.3,
      height:80,

  },
  text:{
      flexDirection:"row",
      margin: 10,
      fontSize: 18,
      color: "#00000090",
      fontWeight: '500',
  },
  image: {
      width: "40%",
      height: 30,
      //borderRadius: 20,
      marginLeft: 10,
      marginBottom: 10,

},
});
