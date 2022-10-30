import React, {useState} from 'react';
import { StyleSheet, RefreshControl, View, TextInput, TouchableOpacity, Text, Modal, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SelectList from 'react-native-dropdown-select-list';
import firebase from "firebase";
import CheckMark from "../components/CheckMark";


    const WIDTH = Dimensions.get("window").width;
    const HEIGHT_MODAL = 450;

    const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

const PropertyModal = (props,) => {

    const navigation = useNavigation();
    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);


    const closeModal = (bool, data) =>{
        props.changeModalVisible(bool);
        props.setData(data);
    }

    
  
    const data = [{key:'1',value:'Water'}, {key:'2',value:'Electricity'}];

    const [address, setaddress] = React.useState("");
    const [propertyDescription, setpropertyDescription] = React.useState("");
    const [suburb, setSuburb] = React.useState("");


    const onPressproperty = () => {
      if (address.length < 3) {
        alert("The address should be at least 3 characters long");
      } else {
        const userId = firebase.auth().currentUser?.uid;
        const propertyId = Date.now();
  
        const dateNow = new Date();
        const time = dateNow.toLocaleTimeString();
        const date = dateNow.toLocaleDateString();

        
        firebase
          .database()
          .ref(`Property/${userId}/${propertyId}`)
          .update({
            address,
            suburb,
            propertyDescription,
            propertyId,
            userId,
          })
          .then(() => {
            setTimeout(() => {
              navigation.goBack();
            }, 2000);
          })
          .catch((error) => {
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
                    <>
                <View style={styles.textview}>
                <Text style={{ fontSize: 20, fontWeight: "bold", margin: 5, alignSelf: "center" }}>Add a property</Text>

                <Text style={styles.text}>property address</Text>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={setaddress}
                  value={address}
                  placeholder="Add property address" />

                <Text style={styles.text}>property suburb</Text>
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={setSuburb}
                      value={suburb}
                      placeholder="Add suburb" />

                <Text style={styles.text}>Decription of the property</Text>
                <TextInput
                  style={[styles.inputStyle, { flex: 1, minHeight: "20%", flexWrap: 'wrap' }]}
                  onChangeText={setpropertyDescription}
                  value={propertyDescription}
                  placeholder="Provide a detailed decription of the problem if you can" />

              </View><TouchableOpacity disabled={true} style={[styles.buttonText, { flexDirection: "row" }]}>
                  <TouchableOpacity onPress={() => closeModal(false, "Cancel")} style={[styles.buttonStyle, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onPressproperty} style={[styles.buttonStyle, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>
                    <Text style={styles.buttonText}>Add property to database</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
                </>
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

export default PropertyModal;