import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Layout from "../components/Layout";
import Dimensions from "../utilities/Dimensions";
import DownloadModal from "../components/DownloadModal";
import Header from "../components/Header";
import { shareAsync } from "expo-sharing";
import { printToFileAsync } from "expo-print";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;


const ProofOfResidence = ({ navigation }) => {

    const dateNow = new Date();
    const time = dateNow.toLocaleTimeString();
    const date = dateNow.toLocaleDateString();

    const html = `
    <html>
      <body>
        <h1 style="text-align:center;">Proof oF Residence</h1> 
        

        <p style="color: ;">Name : Mlondolozi Mbusozayo Zondi .</p>
        <p style="color: ;">Street Address : khank street.</p>
        <p style="color: ;">Stand number : 1265/27</p>
        <p style="color: ;">Suburb: Zone 1</p>
        
        <p style="text-align:center;">To Whom This May Concern,</p>
        <p style=" text-align: right;"> ${date}</p> 
        
        <p style="color: ;">I Mlondolozi Mbusozayo Zondi, formally acknowledge living at the address of 27 Khank street, Zone 1, Suburb of Mankweng, since 2022.</p>

        <p style="color:;">Furthermore, I swear and affirm under penalty of perjury that the facts set forth in this statement are true and accurate.</p>
        
        
        
        
        Sincerely,
        <P></P>
        <P></P>

        
        Mlondolozi Mbusozayo Zondi
      </body>
    </html>
  `;

  let generatePdf = async () => {

    const file = await printToFileAsync({
      html: html,
      base64: true,
    });
    await shareAsync(file.uri);


  };



  return (
    <Layout>
      <Header title="Proof of Residence" />
      <View style={{ flex: 1, alignItems: "center", }}>  
            <TouchableOpacity
            options={{ Animation: 'slide_from_left'}}
            onPress={generatePdf}
            style={styles.TouchableOpacity}
            > 
          
              <View
              style={{ alignSelf: "center", paddingTop: 10,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold", }}>
                Send to yourself
              </Text>

                <Text
                  style={{ alignSelf:"center", color: "#7c7cbf", fontSize: 10,}} >
                  Request proof of residence for yourself 
                </Text>
              </View>
              <View>
                <Ionicons name="arrow-forward" size={30} color="#407ad6" />
              </View>
          </TouchableOpacity>
      </View>
      
      <View style={{ flex: 1, alignItems: "center", }}>
        
            <TouchableOpacity
              onPress={() => navigation.navigate("PdfRequest")}
              style={{paddingHorizontal: 32,
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems: "center",
              marginTop: -230,
              backgroundColor: "#FFF",
              height: DEVICE_HEIGHT * 0.1,
              elevation: 3,
              width: SCREEN_WIDTH * 0.9,
              borderRadius: 16,
              backgroundColor: "#fafbfc",}}
            > 
              <View
                style={{ alignSelf: "center", paddingTop: 10,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "bold", }}>
                    Send to someone else
                </Text>

                  <Text
                    style={{ alignSelf:"center", color: "#7c7cbf", fontSize: 10,}} >
                    Request proof of residence for someone else 
                  </Text>
                </View>
                <View>
                  <Ionicons name="arrow-forward" size={30} color="#407ad6" />
                </View>
          </TouchableOpacity>

      </View>
      
    </Layout>
  );
}
export default ProofOfResidence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  TouchableOpacity:{
              paddingHorizontal: 32,
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems: "center",
              marginTop: 20,
              backgroundColor: "#FFF",
              height: DEVICE_HEIGHT * 0.1,
              elevation: 3,
              width: SCREEN_WIDTH * 0.9,
              borderRadius: 16,
              backgroundColor: "#fafbfc",
  },
  headerContainer: {
    // backgroundColor: "red",
    height: DEVICE_HEIGHT * 0.07,
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
    minHeight: DEVICE_HEIGHT * 0.07,
    width: SCREEN_WIDTH * 0.95,
    backgroundColor: "white",
    marginVertical: 6,
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
