import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TextInput, Alert, Button,TouchableOpacity, ScrollView,FlatList} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createTable, fetchMenuFromDB, insertMenuItems } from '../scripts /database'; 

const HomeScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [menu, setMenu] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedImage = await AsyncStorage.getItem('userImage')
        
        if (storedName) setName(storedName);
        if (storedImage) setImage(storedImage);
      } catch (e) {
        console.error('Failed to load user data.', e);
      }
    };
    
    loadUserData();
  }, []);

  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
  };

  const goToProfile = async () => {
    try {
      await AsyncStorage.setItem("FromHome", "true");
      navigation.replace("Profile")
    } catch (e) {
      console.error('Error changing screen to Profile', e);
    }
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        fetchMenuFromDB((storedMenu) => {
          if (storedMenu.length > 0) {
            setMenu(storedMenu);
          } else {
            fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
              .then(response => response.json())
              .then(data => {
                if (data.menu && Array.isArray(data.menu)) {
                  insertMenuItems(data.menu); // Store data in SQLite
                  setMenu(data.menu);
                } else {
                  console.error('Menu data is not in the expected format.');
                }
              })
              .catch(error => console.error('Failed to fetch menu from server.', error));
          }
        });
      } catch (e) {
        console.error('Failed to fetch menu.', e);
      }
    };

    fetchMenu();
  }, []);

 

  const uniqueCategories = Array.from(new Set(menu.map(item => item.category)));

  const handleCheckBoxPress = (category) => {
    setIsChecked(prevState => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image
          style={styles.logo} 
          source={require("../assets/LEMON.png")}
        />
        <Text style={styles.textHeader}>LITTLE LEMON</Text>
        <View style={styles.ProfileButtonContainer}>
          <TouchableOpacity onPress={goToProfile}>
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
        </TouchableOpacity>
        </View> 
      </View>
      <ScrollView 
      horizontal={true} // Enables horizontal scrolling
      showsHorizontalScrollIndicator={false} // Hides the scroll indicator
      contentContainerStyle={styles.scrollViewContainer} // Optional: Styles the content
    >
      {uniqueCategories.map((category) => (
    <TouchableOpacity
    key={category}
    style={[styles.button, isChecked[category] ? styles.buttonChecked : styles.buttonUnchecked]}
    onPress={() => handleCheckBoxPress(category)}
  >
    <Text style={styles.buttonText}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Text>
  </TouchableOpacity>
    ))}
    </ScrollView>
      <FlatList
        data={menu}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            {item.image ? (
              <Image
                source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }}
                style={styles.menuItemImage}
                
              />
            ) : null}
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
            <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={<Text style={styles.emptyText}>No menu items available.</Text>}
      />
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
  profilePicH:{
    width: 60, // Width of the image
    height: 60, // Height of the image
    borderRadius: 30, // Half of the width/height to make it circular
    borderWidth: 2, // Optional: border width
    borderColor: 'black', // Optional: border color
    backgroundColor: '#edde24',
    textAlign: 'center',
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
    justifyContent: 'center',
    minHeight: 30,
  },
  initialsText2: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  ProfileButtonContainer:{
    position: 'absolute', // Use absolute positioning
    top: 16, // Position from the top of the screen
    right: 10, // Position from the right side of the screen
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
  },
  menuItemPrice: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#888',
  },
  menuItemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom:50,
    flexDirection: 'row', // Ensures items are laid out horizontally
    minHeight: 45, // Set a minimum height for the ScrollView container
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonChecked: {
    backgroundColor: '#009522', // Button color when checked
  },
  buttonUnchecked: {
    backgroundColor: '#cccccc', // Button color when unchecked
  },
  buttonText: {
    color: '#ffffff', // Text color
    fontWeight: 'bold',
    fontSize:15,
  },
});

export default HomeScreen;
