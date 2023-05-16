import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { primaryColor } from '../assets/Colors';
const MenuComponent = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.logoImage} />
      </View>
      
      {/* Menu Options */}
      <View style={styles.menuOptionsContainer}>
        <TouchableOpacity style={styles.menuOption}>
          <Icon name="home-outline" size={24} color={primaryColor} />
          <Text style={styles.active_btn}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuOption}>
          <Icon name="grid-outline" size={24} color="black" />
          <Text style={styles.menuOptionText}>Dashboard</Text>
        </TouchableOpacity>
      </View>
      
      {/* Authentication */}
      <View style={styles.authenticationContainer}>
        <Text style={styles.authenticationHeading}>Authentication</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="log-out-outline" size={24} color="black" />
          <Text style={styles.menuOptionText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      {/* Share */}
      <View style={styles.shareContainer}>
        <Text style={styles.shareHeading}>Share</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Icon name="share-social-outline" size={24} color="black" />
          <Text style={styles.menuOptionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  menuOptionsContainer: {
    paddingVertical: 20,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuOptionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  authenticationContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  authenticationHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    padding: 10,
  },
  shareContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  shareHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  active_btn: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color : primaryColor
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default MenuComponent;
