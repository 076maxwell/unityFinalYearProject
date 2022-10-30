import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, TouchableOpacity, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import DatePicker from "expo-datepicker";
import Layout from "../components/Layout";
import Header from "../components/Header";
import firebase from "firebase";


import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);}


export default function PdfRequest({ navigation }, props) {
      const [fullNames, setFullNames] = useState("Full Names");
      const [reciepentFullNames, setReciepentFullNames] = useState("");
      const [address, setAddress] =useState("");
      const [stand, setStand] = useState("");
      const [ city, setCity] = useState("");

    const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~`;
    const { onPress, title = 'Share or Download the PDF' } = props;


    const dateNow = new Date();
            const date = dateNow.toLocaleDateString();


            useEffect(() => {
              getUserInfomation();
            }, []);
          
            const getUserInfomation = () => {
              const userId = firebase.auth().currentUser?.uid;
              firebase
                .database()
                .ref(`Users/${userId}`)
                .once("value", (snapshot) => {
                  const { email, fullNames, lastName, isAdmin } = snapshot.val();
                  setFullNames(`${fullNames} ${lastName}`);
                });
            };

            const html = `
            <html>
              <body>
                <h1 style="text-align:center;">Proof OF RESIDENCE</h1> 
                
        
                <p style="color: ;">Name : ${reciepentFullNames}.</p>
                <p style="color: ;">Street Address :   ${address}.</p>
                <p style="color: ;">Stand number :  ${stand}</p>
                <p style="color: ;">Suburb: ${city}</p>
                <p style="color: ;">Name of property owner : ${fullNames}.</p>
                
                <p style="text-align:center;">To Whom This May Concern,</p>
                <p style=" text-align: right;"> ${date}</p> 
                
                <p style="color: ;">I ${reciepentFullNames}, formally acknowledge living at the address of ${stand} ${address} Suburb of Mankweng, ${city} since 2022.</p>
        
                <p style="color:;">Furthermore, I swear and affirm under penalty of perjury that the facts set forth in this statement are true and accurate.</p>
                
                
                
                
                Sincerely,
                <P></P>
                <P></P>
        
                
                ${reciepentFullNames}
              </body>
            </html>
          `;
        
          const generatePdf = async () => {
        
            if (address.length < 3 || containsSpecialChars(address)){
              alert("Invalid Address. Enter the right address");
             } if (reciepentFullNames.length < 3 || containsSpecialChars(reciepentFullNames)){
              alert("Invalid Name. Please enter the correct name");
             } else if (address.length > 30){
              alert("Invalid,the address is too long. Please enter the right adress");
             } else if (stand.length < 2){
              alert("Invalid stand number. Please enter a valid stand number");
             } else if (stand.length > 6){
              alert(" Invalid,stand number is too long. Please enter a valid stand number with less than 5 digits");
             } else if (containsSpecialChars(stand)){
                alert("Invalid, stand number. Please enter a valid stand number");
               } else if (containsSpecialChars(city)){
                alert(" Invalid, zone. Please enter a valid zone");
               }
            else { 
            const file = await printToFileAsync({
              html: html,
              base64: true,
            });
            await shareAsync(file.uri);
            }
        
        
          };
        


  return (
    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
      <Layout>
      <Header navigation={navigation} title="Proof of Residence" />
            <View style={styles.container}>
            <Text style = {styles.head}>Dear resident, could you please fill up the followinng details to compconste your request </Text>
            <Text></Text>

            <Text> Please enter the reciepent's full names</Text>
            <TextInput
                placeholder="e.g Maxwell Zondi"
                style={styles.inputStyle}
                onChangeText={(val) => setReciepentFullNames(val)}
            />

            <Text> Please enter your street adddress</Text>
            <TextInput
                placeholder="e.g Thoka street"
                style={styles.inputStyle}
                onChangeText={(val) => setAddress(val)}
            />
            <Text> Please enter your stand number </Text>
            <TextInput
                placeholder="Stand number"
                keyboardType="numeric"
                style={styles.inputStyle}
                onChangeText={(value) => setStand(value)}
            />
            <Text> please enter your Zone</Text>
            <TextInput
                placeholder="e.g Zone 2"
                style={styles.inputStyle}
                onChangeText={(value) => setCity(value)}
            />

        <ActivityIndicator size="large" color="blue" animating={false}   />
                <Pressable style={styles.button} onPress={generatePdf}>
                    <Text style={styles.text}>{title}</Text>
                </Pressable>
            </View>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        alignItems: "center"
    },

  inputStyle: {
    minHeight: DEVICE_HEIGHT * 0.06,
    width: SCREEN_WIDTH * 0.9,
    borderColor: "#407ad6",
    borderWidth: 1,
    color: "black",
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
  },
  buttonStyle: {
    width: "80%",
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: -10,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#407ad6',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        constterSpacing: 0.25,
        color: 'white',
  }
});
