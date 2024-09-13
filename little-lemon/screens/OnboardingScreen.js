import * as React from 'react';
import { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, Alert, Button } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const clearOnboardingFlag = async () => {
  try {
    await AsyncStorage.removeItem('onboardingComplete');
    console.log('Onboarding flag cleared');
  } catch (e) {
    console.error('Error clearing onboarding flag', e);
  }
};

clearOnboardingFlag();
const OnboardingScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("onboardingComplete", "true");
      navigation.replace("Profile"); // Navigate to Profile after onboarding
    } catch (e) {
      console.error("Failed to save onboarding status.", e);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textStyle}>Little Lemon</Text>
        <Image
          style={styles.logo} 
          source={require("../assets/little-lemon-logo.png")}
        />
      </View>

      <Text style={styles.textStyle}>Let us get to know you</Text>

      <TextInput 
        style={styles.inputStyle}
        placeholder='Type your name'
        value={name}
        onChangeText={setName}
      />
      <TextInput 
        style={styles.inputStyle}
        placeholder='Type your email'
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <Button title="Complete Onboarding" onPress={completeOnboarding} color="#006600" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 16,
  },
  inputStyle: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
});

export default OnboardingScreen;
