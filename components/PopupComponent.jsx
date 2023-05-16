import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { neutral0Color, primaryColor } from '../assets/Colors';
import { useNavigation } from '@react-navigation/native';
const PopupComponent = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));
  const onCameraPress = ()=>{
    navigation.navigate('camera')
  }

  const onGalleryPress = ()=>{
    navigation.navigate('pick/image')
  }
  useEffect(() => {
    if (isVisible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <Modal animationType="none" transparent visible={isVisible}>
      <View style={styles.container}>
        <Animated.View style={[styles.popup, { transform: [{ translateY }] }]}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={onCameraPress}>
              <Icon name="camera" size={16} color={neutral0Color} style={styles.buttonIcon} />
              <Text style={styles.buttonText} >Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onGalleryPress}>
              <Icon name="image" size={16} color={neutral0Color} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Gallery</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,

  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 104,
    height: 104,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: neutral0Color,
    marginTop: 8,
    textAlign: 'center',
  },
  
  buttonIcon: {
    marginRight: 0,
  },
  cancelButton: {
    width: 160,
    height: 40,
    backgroundColor: primaryColor,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PopupComponent;
