import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Layout from "../components/Layout";
import Header from "../components/Header";
import Dimensions from "../utilities/Dimensions";
import CheckMark from "../components/CheckMark";
import { FloatingAction } from "react-native-floating-action";
import LogFaultModal from "../components/LogFaultModal";
import PropertyModal from "../components/PropertyModal";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LogBox } from 'react-native';
import { ProgressSteps, ProgressStep, } from 'react-native-progress-steps';


LogBox.ignoreLogs(['Object.values requires that input parameter not be null or undefined']);
LogBox.ignoreLogs(["null is not an object (evaluating '_snapshot$val.faultsId')"]);
LogBox.ignoreLogs(["Failed prop type: Invalid prop `activeStep` of type `array` supplied to `ProgressSteps`, expected `number`"]);

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;




export default function LogFault() {
    const navigation = useNavigation();
    const [loaded, setLoaded] = useState(true);

    const [isModalVisible, setisModalVisible] = useState(false);
    const [chooseData, setChooseData] = useState();
    const changeModalVisible = (bool) =>{
       setisModalVisible(bool);
     }
   
     const setData = (data) => {
       setisModalVisible(data)
     }



    const [faultsId, setFaultsId] = React.useState("");
    const [faults, setFaults] = useState([]);
    const [barStatus, setBarStatus] = useState("");

    useEffect(() => {
      getLoggedFaults();
    }, []);
  
    const getLoggedFaults = () => {
      const userId = firebase.auth().currentUser?.uid;
      
      try {
        setLoaded(false);
        firebase
          .database()
          .ref(`faults/${userId}/${faultsId}`) 
          .once("value", (snapshot) => {
              const { faultsId } = snapshot.val();
                setFaultsId(faultsId)
                setBarStatus(setBarStatus)
              const LoggedFaults = Object.values(snapshot.val()); 
              setFaults(LoggedFaults.sort((a, b) => (b.faultId < a.faultId ? 1 : -1)));
              setLoaded(true);
              })
          .then(() => {
            setLoaded(true);
              }); 
              setTimeout(() => {
                setLoaded(true);;
              }, 1000);
          }
          catch (error) {
              console.log(error);
          }
    }; 

    const renderItem = ({ item }) => <Item item={item} />;

      const Item = ({ item }) => (
        <View style={styles.itemContainer}>
          <View style={styles.itemHeaderContainer}>
            <Text style={styles.title}>{item.faultHeader}</Text>
          </View>
          
          <View style={{flex: 1, alignItems:"center"}}>
          
            <ProgressSteps 
                  activeStep={[item.barStatus]} 
                  labelFontSize={8} 
                  marginBottom={15}
                  completedProgressBarColor={"#407ad6"}
                  completedStepIconColor={"#407ad6"} 
                  activeStepIconBorderColor={"#407ad6"} 
                  activeLabelColor={"black"}
                  completedProgressBarColo={"#407ad6"}
                  topOffset={10}
            
                   >
                <ProgressStep label="Submitted" removeBtnRow={true}>
                </ProgressStep>
                <ProgressStep label="Evaluating" removeBtnRow={true}>
                </ProgressStep>
                <ProgressStep label="Updated/Action" removeBtnRow={true} >
                </ProgressStep>
                <ProgressStep label="Processed" removeBtnRow={true} >
                </ProgressStep>
              </ProgressSteps>
          </View>

          <View style={styles.itemMessageContainer}>
            <Text style={styles.messageText}>{item.faultDescription}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{item.date}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
      );
   
    if(!loaded) {
      return (
          
          <View style={[styles.container, {justifyContent: "center", alignItems: "center",}]}>
              <ActivityIndicator color='#407ad6' size={36} />
          </View>

          )
      }

      else if (faultsId !== "" ){ 
        return (

          <Layout>
                  <Header navigation={navigation} title="Log a Fault" />
                    <FlatList
                        data={faults}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.faultId}
                        style={{
                        padding: 10,
                        backgroundColor: "#f2f2f2",
                        }}
                    />

                        <FloatingAction
                        margin={5}
                        color={"#407ad6"}
                        iconColor={'#ffffff'}
                        showBackground={false}
                        animated={true}
                        visible={true}
                        floatingIcon={
                        <MaterialCommunityIcons
                          name="square-edit-outline"
                          size={30}
                          color="#f2f2f2"
                        />}
                        iconWidth={30}
                        iconHeight={30}
                        dismissKeyboardOnPress={true}
                        onPressMain={() => changeModalVisible(true)}
                        />

                            <Modal
                                transparent={true}
                                animationType="fade"
                                visible={isModalVisible}
                                nRequestClose={() => changeModalVisible(false)}
                                >
                                <LogFaultModal 
                                changeModalVisible={changeModalVisible}
                                setData={setData}
                                />          
                            </Modal>
                    </Layout>
            
        )} else 
            {  return (
                <Layout>
                <Header navigation={navigation} title="Log a Fault" />
                    <TouchableOpacity 
                    style={styles.headerContainer} 
                    onPress={() => changeModalVisible(true)}
                    >
                        <Ionicons name="add-circle-outline" size={32} color="#54545c" style={{alignSelf:"flex-start"}}/>
                        <Text style={{fontSize: 20, alignSelf:"flex-start", paddingLeft:20,}}>Add a Fault</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={true}>
                        <Text style={{alignSelf:"flex-start", padding:10,}}>No item Found.</Text>
                    </TouchableOpacity>


                    <Modal
                        transparent={true}
                        animationType="fade"
                        visible={isModalVisible}
                        nRequestClose={() => changeModalVisible(false)}
                        >
                        <LogFaultModal 
                        changeModalVisible={changeModalVisible}
                        setData={setData}
                        />          
                </Modal>
            </Layout>
                );
                }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      // backgroundColor: "red",
      height: DEVICE_HEIGHT * 0.07,
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "row",
      padding:10,
      paddingLeft:20,
      borderWidth: 0.5,
      borderColor: "lightgrey"
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
      borderRadius: 10,
      padding: 10,
      elevation: 3,
    },
    itemHeaderContainer: {
      minHeight: DEVICE_HEIGHT * 0.04,
      width: "95%",
      borderBottomColor: "grey",
      borderBottomWidth: 0.6,
      justifyContent: "center",
      //alignItems: "center",
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
      alignItems:"center",
      justifyContent:"space-between",
    },
    timeText: {
      color: "grey",
      marginHorizontal: 10,
    },
  });
  
