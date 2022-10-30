import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';


    const WIDTH = Dimensions.get("window").width;
    const HEIGHT_MODAL = 150;



const PrepaidModal= (props,) => {

    const navigation = useNavigation();

    return (
    
        <TouchableOpacity
            disabled={true}
            style={styles.container }
        >
            <View style={styles.modal}>
                <View style={styles.textview}>
                <Text style={{fontSize: 20, fontWeight: "bold", margin: 5, }}>Reciept</Text>
                <Text style={styles.text}>An email with voucher number will be sent to you. Thank You!</Text>
                </View>
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
        borderWidth: 0.5,
        
    },
    textview:{
        flex:1,
        alignItems:"center",
    },
    text: {
        margin: 5,
        fontSize: 14,
        fontWeight: "bold",
        alignSelf: "center"
    },   
})

export default PrepaidModal;