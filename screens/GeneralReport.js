import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  View,
  Image,
  ScrollView,
  Button
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

import firebase from "firebase";
import Layout from "../components/Layout";
import Header from "../components/Header";
import CheckMark from "../components/CheckMark"
import SentMail from "../components/SentMail";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import MaterialIconsI from 'react-native-vector-icons/MaterialIcons'
import InputBox from 'react-native-floating-label-inputbox'



import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);}

export default function Generalrequest({ navigation }) {
  const [body, setBody] = React.useState("");
  const [name, setName] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);


  const onPressPost = async () => {
    if (body == "" || body.length < 10) {
      alert("Please enter a valid description of the problem");
    } else if (name.length < 3 || containsSpecialChars(name)) {
        alert("Please enter a valid Address");
      } else {
      //const userId = firebase.auth().currentUser?.uid;
      const requestId = Date.now();
      const dateNow = new Date();
      const time = dateNow.toLocaleTimeString();
      const date = dateNow.toLocaleDateString();
      setIsDone(true);
      setIsLoading(true);
      firebase
        .database()
        .ref(`Generalrequest/${requestId}`)
        .update({
          Address,
          body,
          requestId,
          name,
        })
        .then(() => {
            setIsDone(true);
            setTimeout(() => { navigation.goBack(); }, 3000);
        })
        .catch((error) => {
          setIsLoading(true);
          alert(error);
        });
      
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
            xhr.onload = function() {
              resolve(xhr.response);
            };
            xhr.onerror = function() {
              reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
          })

        const ref = firebase.storage().ref().child(`Generalrequest/${requestId}`)
        const snapshot = ref.put(blob)
        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            setUploading(true)
          },
          (error) => {
            setUploading(false)
            console.log(error)
            blob.close()
            return 
          },
          () => {
            snapshot.snapshot.ref.getDownloadURL().then((url) => {
              setUploading(false)
              console.log("Download URL: ", url)
              setImage(url)
              blob.close()
              return url
            })
          }
          )
      }

        
  };

  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)

  const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, 
        // We can specify whether we need only Images or Videos
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,   // 0 means compress for small size, 1 means compress for maximum quality

      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    };


  return (
    <Layout>
      <Header navigation={navigation} title="new General Request" />
      {isDone ? (
        <SentMail />
      ) : (
        <>
        <ScrollView>

        
            <View style={{flexDirection:"row", alignItems: "center",}}>
                <View style={{marginTop:15, marginRight:10}}>
                    <MaterialCommunityIcons name="account" size={35} color="#407ad6" />
                </View>
        
                <View>
                    <InputBox
                        inputOutline={true}
                        required={true}
                        customLabelStyle={styles.inputText}
                        inputboxStyle={styles.inputStyle}
                        onChangeText={setName}
                        value={name}
                        label={"Full Names"}
                        multiline={true}
                
                    />
                </View>            
            </View>

            <View style={{flexDirection:"row", alignItems: "center",}}>
                <View style={{marginTop:15, marginRight:10}}>
                    <MaterialIcons name="location-pin" size={35} color="#407ad6" />
                </View>
        
                <View>
                    <InputBox
                        inputOutline={true}
                        customLabelStyle={styles.inputText}
                        inputboxStyle={styles.inputStyle}
                        onChangeText={setAddress}
                        value={Address}
                        label={"Address"}
                        multiline={true}
                
                    />
                </View>            
            </View>

          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center",}}>
            <View style={{marginTop:15, marginRight:10}}>
                <MaterialCommunityIcons name="message-arrow-right-outline" size={30} color="#407ad6" />
            </View>
          
            <View>
                <InputBox                   
                    inputOutline={true}
                    multiline={true}
                    customLabelStyle={styles.inputText}
                    inputboxStyle={[styles.inputStyle, {minHeight: DEVICE_HEIGHT * 0.09,}]}
                    onChangeText={setBody}
                    value={body}
                    required={true}
                    label={"Description"}
            />
            </View>            
          </View>

            <Text style={styles.displayText}>
              If you would like to add an image, Please click on the icon below
            </Text>
          <View style={{flexDirection:"row", justifyContent:"center", marginBottom:10,}}>
            
            <TouchableOpacity style={{marginTop:20, marginRight:10}} onPress={pickImage}>      
                  <MaterialCommunityIcons name="camera-image" size={30} color="#407ad6" />
          </TouchableOpacity>
            {image && <Image source={{uri: image}} style={[styles.inputStyle, {minHeight: DEVICE_HEIGHT * 0.19,}]}/>}          
          
          </View>

          <TouchableOpacity  onPress={onPressPost} style={styles.buttonStyle}>
            {isLoading ? (
              <ActivityIndicator size={"large"} color="white" />
            ) : (
              <Text style={styles.buttonText}>Send Now</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
        
                    
        </>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },

  inputStyle: {
    minHeight: DEVICE_HEIGHT * 0.07,
    width: SCREEN_WIDTH * 0.78,
    borderColor: "#407ad6",
    borderWidth: 1.2,
    //color: "black",
    marginTop: 20,
    borderRadius: 10,
    padding: 5,
  },
  inputText: {
    fontSize: 12, 
    marginTop: 20, 
    marginLeft: 10, 
    borderColor: "#407ad6",
    
  },
  buttonStyle: {
    width: "70%",
    height: DEVICE_HEIGHT * 0.065,
    backgroundColor: "#407ad6",
    borderRadius: 10,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  displayText: {
    fontSize: 12,
    marginTop: 20,
    marginLeft: 10,
    color: "grey",
  },
});
