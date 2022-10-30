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
import AccountHeader from "../components/AccountHeader";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;


const Documents = ({ navigation }) => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData, setChooseData] = useState();
  const changeModalVisible = (bool) =>{
    setisModalVisible(bool);
  }

  const setData = (data) => {
    setisModalVisible(data)

  }
  return (
    <Layout>
      <AccountHeader title="Documents" />
      <View style={{ flex: 1, alignItems: "center", }}>  
            <TouchableOpacity
            options={{ Animation: 'slide_from_left'}}
            onPress={() => navigation.navigate("ProofOfResidence")}
            style={styles.TouchableOpacity}
            > 
          
              <View
              style={{ alignSelf: "center", paddingTop: 10,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold", }}>
                Proof of Residence
              </Text>

                <Text
                  style={{ alignSelf:"center", color: "#7c7cbf", fontSize: 10,}} >
                  Requsest proof of residence 
                </Text>
              </View>
              <View>
                <Ionicons name="arrow-forward" size={30} color="#407ad6" />
              </View>
              <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                nRequestClose={() => changeModalVisible(false)}
                >
                <DownloadModal 
                changeModalVisible={changeModalVisible}
                setData={setData}
                />
          
                </Modal>
          </TouchableOpacity>
      </View>
      
      <View style={{ flex: 1, alignItems: "center", }}>
        
            <TouchableOpacity
              onPress={() => changeModalVisible(true)}
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
                  Title Deed
                </Text>

                  <Text
                    style={{ alignSelf:"center", color: "#7c7cbf", fontSize: 10,}} >
                    Download your proof of ownership 
                  </Text>
                </View>
                <View>
                  <Ionicons name="arrow-forward" size={30} color="#407ad6" />
                </View>
                    <Modal
                      transparent={true}
                      animationType="fade"
                      visible={isModalVisible}
                      nRequestClose={() => changeModalVisible(false)}
                      >
                      <DownloadModal 
                      changeModalVisible={changeModalVisible}
                      setData={setData}
                    />
                    </Modal>
          </TouchableOpacity>

      </View>
      
    </Layout>
  );
}
export default Documents;

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
