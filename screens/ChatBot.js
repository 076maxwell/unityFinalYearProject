import React, {useState, StatusBar} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from '../src/styles';
import Msg from '../src/msg';
import {data} from '../src/data';
import Layout from "../components/Layout";
import ChatHeader from "../components/ChatHeader";
import Dimensions from "../utilities/Dimensions";


const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

let chats = [];
const ChatBot = ({navigation}) => {
  const [msg, setMsg] = useState('');
  const [chatList, setChatList] = useState([]);

  const getAnswer = q => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].question.includes(q.toLowerCase())) {
        chats = [...chats, {msg: data[i].answer, incomingMsg: true}];
        setChatList([...chats].reverse());
        return;
      }
    }

    chats = [
      ...chats,
      {msg: "Didn't recognise your Text, Please type in Full English sentences and May you please ask the location specific information Thank you!!!", incomingMsg: true},
    ];
    setChatList([...chats].reverse());
    return;
  };

  const onSendMsg = () => {
    chats = [...chats, {msg: msg, sentMsg: true}];
    setChatList([...chats].reverse());
    setTimeout(() => {
      getAnswer(msg);
    }, 1000);
    setMsg('');
  };

  return (
    <><ChatHeader title="Let's Chat" />
    <FlatList
      style={{ height: '80%', bottom: '3%' }}
      inverted={true}
      keyExtractor={(_, index) => index.toString()}
      data={chatList}
      renderItem={({ item }) => (
        <Msg
          incomingMsg={item.incomingMsg}
          msg={item.msg}
          sentMsg={item.sentMsg} />
      )} /><View style={styles.typeMsgContainer}>
        <TextInput
          style={styles.typeMsgBox}
          value={msg}
          placeholder="Type Here..."
          keyboardType='ascii-capable'
          onChangeText={val => setMsg(val)} />
        <TouchableOpacity
          style={[styles.sendBtn, { backgroundColor: msg ? '#215bb8' : '#407ad6' }]}
          disabled={msg ? false : true}
          onPress={() => onSendMsg()}>
          <Text style={styles.sendTxt}>send</Text>
        </TouchableOpacity>
      </View></>
    
  );
};

export default ChatBot;
