import React, {useState} from 'react';
import { StyleSheet, RefreshControl, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Text, Modal, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SelectList from 'react-native-dropdown-select-list';
import firebase from "firebase";
import CheckMark from "../components/CheckMark";


    const WIDTH = Dimensions.get("window").width;
    const HEIGHT_MODAL = 450;

    const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

const LogFaultModal = (props,) => {

    const navigation = useNavigation();
    const [refreshing, setRefreshing] = React.useState(false);


    const closeModal = (bool, data) =>{
        props.changeModalVisible(bool);
        props.setData(data);
    }

    
  
    const data = [{key:'1',value:'Water'}, {key:'2',value:'Electricity'}, {key:'3',value:'Other'}];

    const [faultHeader, setfaultHeader] = React.useState("");
    const [faultDescription, setfaultDescription] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [barStatus, setbarStatus] = useState(1);
    const [isDone, setIsDone] = React.useState(false);
    const [selected, setSelected] = React.useState("");


    const onPressfault = () => {
      if (faultHeader.length < 3) {
        alert("The header should be at least 3 characters long");
      } else if (faultDescription.length < 5) {
        alert("The Description of the fault should be at least 10 characters long");
      } else {
        const userId = firebase.auth().currentUser?.uid;
        const faultId = Date.now();
  
        const dateNow = new Date();
        const time = dateNow.toLocaleTimeString();
        const date = dateNow.toLocaleDateString();
        setIsLoading(true);

        
        firebase
          .database()
          .ref(`faults/${userId}/${faultId}`)
          .update({
            faultHeader,
            selected,
            faultDescription,
            faultId,
            userId,
            time,
            date,
            barStatus,
          })
          .then(() => {
            setIsDone(true);
            setTimeout(() => {
              navigation.goBack();
            }, 2000);
          })
          .catch((error) => {
            setIsLoading(true);
            closeModal(false, "OK")
            alert(error);
          });
      }
    };
  
    return (
         
        <TouchableOpacity
            disabled={true}
            style={styles.container }
        >  
              <View style={styles.modal}>
       
                  {isDone ? (
                        <CheckMark />
                      ) : (
                          <>
                      <View style={styles.textview}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", margin: 5, alignSelf: "center" }}>Add a fault</Text>

                        <Text style={styles.text}>Fault header</Text>
                        <TextInput
                          style={styles.inputStyle}
                          onChangeText={setfaultHeader}
                          value={faultHeader}
                          placeholder="Add fault header" />               

                        <Text style={styles.text}>Fault type</Text>

                        <SelectList
                          setSelected={setSelected}
                          data={data}
                          search={false}
                          boxStyles={{ borderRadius: 10, width: "50%", marginLeft: 10, padding: 5, }}
                          dropdownStyles={{ width: "50%", borderRadius: 10, marginLeft: 10 }}
                          maxHeight={110} />

                        <Text style={styles.text}>Decription of the fault</Text>
                        <TextInput
                          multiline={true}
                          style={[styles.inputStyle, { flex: 1, minHeight: "20%", flexWrap: 'wrap' }]}
                          onChangeText={setfaultDescription}
                          value={faultDescription}
                          placeholder="Provide a detailed decription of the problem if you can" />

                      </View>
                    
                      <TouchableOpacity disabled={true} style={[styles.buttonText, { flexDirection: "row" }]}>
                          <TouchableOpacity onPress={() => closeModal(false, "Cancel")} style={[styles.buttonStyle, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}>
                            <Text style={styles.buttonText}>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={onPressfault} style={[styles.buttonStyle, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>
                            <Text style={styles.buttonText}>Log a Fault Now</Text>
                          </TouchableOpacity>
                      </TouchableOpacity>
                      </>
                              
                      )}
                      </View>
              </TouchableOpacity>
        
            
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {        
        width: WIDTH - 50,
        height: HEIGHT_MODAL,
        paddingTop: 10,
        backgroundColor: "white",
        borderRadius: 11,
        borderWidth: 1,
        
    },
    textview:{
        flex:1,
    },
    text: {
        marginTop: 10,
        marginBottom: 3,
        fontSize: 14,
        marginLeft: 10,
        
    },   
    buttonStyle: {
        width: "50%",
        height: 55,
        backgroundColor: "#407ad6",
        borderRadius: 10,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        borderWidth: 0.5,
      },
      buttonText: {
        color: "white",
        fontSize: 15,
      },
      inputStyle: {
        minHeight: "10%",
        width: "75%",
        borderWidth: 0.5,
        color: "black",
        marginLeft: 10,
        borderRadius: 10,
        padding: 5,
      },
})

export default LogFaultModal;