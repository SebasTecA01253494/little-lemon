import * as React from 'react';
import { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, Alert, Button } from 'react-native';

const OnboardingScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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

      <Button
        onPress={ () => Alert.alert("Next page, it is not programmed yet") }
        title="Next"
        color="#006600"
      />
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
