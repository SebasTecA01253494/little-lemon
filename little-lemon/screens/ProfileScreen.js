import * as React from 'react';
import { View, Image, StyleSheet, Text, TextInput, Alert, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {

  const changeScreen = async () => {
    try {
      await AsyncStorage.setItem("onboardingComplete", "false");
      navigation.replace("Onboarding")
    } catch (e) {
      console.error('Error clearing onboarding flag', e);
    }
  };
  
  return (
    <View style={styles.container}>
    <Text style={styles.textStyle}>Profile page</Text>
    <View style={styles.buttonContainer}>
    <View style={styles.logoutButton}>
      <Button 
        title="Log Out" 
        onPress={changeScreen}
        color="#FAFA33"/>
    </View>
   
    <View style={styles.buttonRow}>
      <View style={styles.saveButton}>
        <Button 
          title="Save Changes" 
          color="#009522"/>
      </View>
      <View style={styles.discardButton}>
        <Button 
          title="Discard Changes" 
          color="#009522"/>
      </View>
    </View>
    </View>    
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 300,
    resizeMode: "contain",
  },
  title: {
    marginTop: 48,
    paddingVertical: 10,
    color: "#333333",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    justifyContent: 'flex-end', // Pushes the buttons towards the bottom
    paddingBottom: 30, // Extra padding from the bottom screen edge
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  discardButton: {
    width: '50%', // Custom width for Discard Changes button
    height: 50,   // Custom height
    alignSelf: 'center',
    marginVertical: 10,
  },
  saveButton: {
    width: '40%', // Custom width for Save Changes button
    height: 50,   // Custom height
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between the buttons
    marginVertical: 0,
  },
  logoutButton: {
    width: '100%',
    height: 60,
    alignSelf: 'center',
    marginBottom: 10, // Adds space between Log Out and the row of buttons below
  }
});

export default ProfileScreen;
