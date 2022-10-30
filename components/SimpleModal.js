import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Modal, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';


    const WIDTH = Dimensions.get("window").width;
    const HEIGHT_MODAL = 150;



const SimpleModal = (props,) => {

    const navigation = useNavigation();

    const closeModal = (bool, data) =>{
        props.changeModalVisible(bool);
        props.setData(data);
    }
const onPress = () => {
    navigation.navigate("StripeWrapper");
    closeModal(false, "OK");

}
    return (
    
        <TouchableOpacity
            disabled={true}
            style={styles.container }
        >
            <View style={styles.modal}>
                <View style={styles.textview}>
                <Text style={{fontSize: 20, fontWeight: "bold", margin: 5, }}>Payment</Text>
                <Text style={styles.text}>You are about to be redirected to the card payment session</Text>
                </View>
            
            <View style={styles.Buttonview}>
                <TouchableOpacity 
                    onPress={() => closeModal(false, "Cancel")}
                    style={[styles.TouchableOpacity, {borderBottomLeftRadius: 10,}]}>
                    <Text styles={styles.text}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={onPress}
                    style={[styles.TouchableOpacity, {borderBottomRightRadius: 10,}]}>
                    <Text styles={[styles.text, {color: '#407ad6'}]}>OK</Text>
                </TouchableOpacity>

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
        borderWidth: 0.6,
    },
    textview:{
        flex:1,
        alignItems:"center",
    },
    text: {
        margin: 5,
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "center",
        backgroundColor:"white",
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

export default SimpleModal;