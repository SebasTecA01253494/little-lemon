import * as React from 'react';
import { View,StyleSheet, Text, Image, Pressable } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  // Add welcome screen code here.
  return (
    <View style={styles.container}>
    <View style={styles.contentContainer}>
      <Image style={styles.logo} source={require("../assets/little-lemon-logo.png")}/>
      <Text style={styles.title}>Little Lemon, your local Mediterranean Bistro</Text>
    </View>

      <Pressable  onPress={() => navigation.navigate("Subscribe")} style={styles.buttonWrapper} >
        <Text style={styles.buttonText}>NewsLetter</Text>
      </Pressable>

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

export default WelcomeScreen;
