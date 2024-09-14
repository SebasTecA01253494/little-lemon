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
    <Button 
      title="Save Changes" 
      color="#009522"/>

    <Button 
      title="Discard Changes" 
      color="#009522"/>
      <Button 
      title="Log Out" 
      onPress={changeScreen}
      color="#FAFA33"/>
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
  buttonWrapper: {
    borderRadius: 8,
    backgroundColor: '#495E57',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  }
});

export default ProfileScreen;
