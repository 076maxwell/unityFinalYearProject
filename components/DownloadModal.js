import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal, Dimensions, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    checkFileIsAvailable,
    downloadFileFromUri,
    openDownloadedFile,
  } from "expo-downloads-manager";

    const WIDTH = Dimensions.get("window").width;
    const HEIGHT_MODAL = 150;



export default function DownloadModal(props){


    const [downloadStatus, setDownloadStatus] = React.useState("NOTSTARTED");
    const [downloadProgress, setDownloadProgress] = React.useState(0);
    const [isDone, setIsDone] = React.useState(false);
  
    const uri = "https://sahris.sahra.org.za/sites/default/files/additionaldocs/TITLE%20DEEDS_1.pdf";
    const fileName = "Title Deed.pdf";


    const callback = (downloadProgress) => {
        const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
    };


    async function checkAvail() {
        const { isAvailable } = await checkFileIsAvailable(fileName);
        if (isAvailable) {
        setDownloadStatus("FINISHED");
        }
    }

    React.useEffect(() => {
        checkAvail();
    }, [uri]);




    const closeModal = (bool, data) =>{
        props.changeModalVisible(bool);
        props.setData(data);
    }

    return (
    
        <TouchableOpacity
            disabled={true}
            style={styles.container }
        >
            <View style={styles.modal}>
            {isDone ? (
                        <>
                        <View style={[styles.container, { justifyContent: "center", alignItems: "center", }]}>
                            <ActivityIndicator color='#407ad6' size={36} />
                        </View>
                        </>
                        
                      ) : (
                        <>
                        <View style={styles.textview}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", margin: 5, }}>Tittle Deed</Text>
                            <Text style={styles.text}>The document you are about to download is password protected. The password is your ID number</Text>
                        </View><View style={styles.Buttonview}>
                                <TouchableOpacity
                                    onPress={() => closeModal(false, "Cancel")}
                                    style={[styles.TouchableOpacity, { borderBottomLeftRadius: 10, }]}>
                                    <Text styles={styles.text}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={async () => {
                                        setIsDone(true);                                       
                                        const { status, error } = await downloadFileFromUri(
                                            uri,
                                            fileName,
                                            callback);
                                        await openDownloadedFile(fileName);                                        
                                        closeModal(false, "OK");
                                        
                                    } }
                                    style={[styles.TouchableOpacity, { borderBottomRightRadius: 10, }]}>
                                    <Text styles={styles.text}>OK</Text>
                                </TouchableOpacity>
                            </View>
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
        width: WIDTH - 80,
        height: HEIGHT_MODAL,
        paddingTop: 10,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 0.6,
    },
    textview:{
        flex:1,
        alignItems:"center",
    },
    text: {
        margin: 5,
        fontSize: 12,
        fontWeight: "bold",
        alignSelf: "center"
    },
    Buttonview:{
        width: "100%",
        flexDirection: "row",
    },
    TouchableOpacity:{
        backgroundColor:"white",
        flex:1,
        alignItems:"center",
        paddingVertical:10,
        borderTopWidth: 0.2,
        borderBottomColor: 0.1, 
    }
     
})
