import React, { children } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
const KeyboardAvoidingComponent = (Children) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1}}> 
        <ScrollView showsVerticalScrollIndicator={false} > 
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {Children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingComponent;