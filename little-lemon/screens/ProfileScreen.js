import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TextInput, Alert, Button,TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = ({ navigation }) => {

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedEmail = await AsyncStorage.getItem('userEmail');
        
        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
      } catch (e) {
        console.error('Failed to load user data.', e);
      }
    };
    
    loadUserData();
  }, []);
  const pickImage = async () => {
    // Request permission to access the image library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need permission to access your photos!');
      return;
    }

    // Open the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update the state with the selected image URI
    }
  };
  const removeImage = async () => {
    setImage(null)
  }

  const changeScreen = async () => {
    try {
      await AsyncStorage.setItem("onboardingComplete", "false");
      navigation.replace("Onboarding")
    } catch (e) {
      console.error('Error clearing onboarding flag', e);
    }
  };
  const back = async () => {
    try {
      navigation.replace("Home")
    } catch (e) {
      console.error('Error clearing onboarding flag', e);
    }
  };
  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={back}>
        <Image
          source={require("../assets/Button_Header.png")}
          style={styles.backButton}
        />
      </TouchableOpacity>
        </View>
      
      <Image
          style={styles.logo} 
          source={require("../assets/LEMON.png")}
        />
        <Text style={styles.textHeader}>LITTLE LEMON</Text>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.profilePicH}
          />
        ) : (
          <View style={styles.profilePicH}>
            <Text style={styles.initialsText2}>{getInitials(name)}</Text>
          </View>
        )}
      </View>

      <View style={styles.imageContainer}>
    
      {image ? (
          <Image
            source={{ uri: image }}
            style={styles.profilePic}
          />
        ) : (
          <View style={styles.profilePic}>
            <Text style={styles.initialsText}>{getInitials(name)}</Text>
          </View>
        )}
        
        <View style={styles.buttonRow}>
        <TouchableOpacity 
        onPress={pickImage} 
        style={styles.button}>
          <Text style={styles.buttonText}>Change</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={removeImage}
        style={styles.button2}>
          <Text style={styles.buttonText2}>Remove</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    <View style={styles.buttonContainer}>
    <TouchableOpacity 
      style={styles.logoutButton}
      onPress={changeScreen}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
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
    width: 60,
    height: 60,
    marginVertical: 16,
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
    flex: 1,
    justifyContent: 'flex-end', // Pushes the buttons towards the bottom
    paddingBottom: 30, // Extra padding from the bottom screen edge
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  buttonText2: {
    fontSize: 16,
    color: 'black'
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
    backgroundColor: '#edde24',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePic:{
    width: 100, // Width of the image
    height: 100, // Height of the image
    borderRadius: 50, // Half of the width/height to make it circular
    borderWidth: 2, // Optional: border width
    borderColor: 'black', // Optional: border color
    marginRight:10,
    backgroundColor: '#edde24',
    textAlign: 'center'
  },
  profilePicH:{
    width: 60, // Width of the image
    height: 60, // Height of the image
    borderRadius: 30, // Half of the width/height to make it circular
    borderWidth: 2, // Optional: border width
    borderColor: 'black', // Optional: border color
    backgroundColor: '#edde24',
    textAlign: 'center',
    position: 'absolute', // Use absolute positioning
    top: 16, // Position from the top of the screen
    right: 10, // Position from the right side of the screen
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align items vertically at the start
    alignItems: 'flex-start', // Align items horizontally at the start
    marginBottom: 10,
    marginTop: 20,
    width: '100%', // Ensure container takes full width
    paddingLeft: 10, // Add padding to the left if needed
  },
  textHeader:{
    fontSize: 20,
    fontWeight: 'bold',
    color: "#136f00",
    marginRight:40
  },
  header: {
    alignItems: 'center',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#009522',
    padding: 10,
    borderRadius: 5,
    marginTop: 25,
    marginLeft:30
  },
  button2: {
    backgroundColor: '#edde24',
    padding: 10,
    borderRadius: 5,
    marginTop: 25,
    marginLeft:30
  },
  initialsText: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center'
  },
  initialsText2: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  backButton:{
    width: 50, // Width of the image
    height: 50, // Height of the image
    resizeMode: 'contain',
    
  },
  backButtonContainer:{
    position: 'absolute',
    top: 25,   // Adjust the vertical position of the back button
    left: 0,  // Adjust the horizontal position of the back button
  }
});

export default ProfileScreen;
