import * as React from 'react';
import { View,StyleSheet, Text, Image, Pressable, TextInput, Alert, KeyboardAvoidingView,Platform} from 'react-native';
import { validateEmail } from '../utils';

const SubscribeScreen = () => {
  [email, onChangeEmail ]=React.useState("");
  const isEmailValid = validateEmail(email);
  // Add subscribe screen code here
  return (
    <View style={styles.container}>
     
    <Image style={styles.logo} source={require("../assets/little-lemon-logo-grey.png")}/>
    <Text style={styles.title}>Subscribe to our newsletter for our latest delicious recepies!</Text>
   
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <TextInput 
     style={styles.input} 
     value={email} 
     onChangeText={onChangeEmail} 
     keyboardType='email-adress'
     placeholder={'Type your email'} 
     /> 
    <Pressable onPress={() => Alert.alert("Thanks for subscribing, stay tuned")} style={[styles.buttonWrapper, !isEmailValid && styles.disabled]}  disabled={!isEmailValid} >
      <Text style={styles.buttonText}>Subscribe</Text>
    </Pressable>
      
    </KeyboardAvoidingView>
  </View>


);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  logo: {
    height: 200,
    width: 300,
    resizeMode: "contain",
  },
  title: {
    color: "#333333",
    textAlign: "center",
    fontSize: 20,
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: 'EDEFEE',
    backgroundColor: '#EDEFEE',
  },
  buttonWrapper: {
    borderRadius: 8,
    backgroundColor: '#495E57',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
  disabled: {
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  input: {
    height: 40,
    marginVertical: 24,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
  },
});
export default SubscribeScreen;
