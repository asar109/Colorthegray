import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
  StatusBar,
  Button,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { neutral0Color, neutral100Color, primaryColor } from '../assets/Colors';
import * as MediaLibrary from 'expo-media-library';
import { manipulateAsync } from 'expo-image-manipulator';


const FilterComponent = ({ navigation, route }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [image, setImage] = useState(null);
  const [filteredImageUri, setFilteredImageUri] = useState(null);

console.log(image)
  const applyFilter = (filterName) => {
    setSelectedFilter(filterName);
    // Apply filter to the image
  };



  const convertNegativeImage = async () => {
    if (!image) {
      console.log('No image selected.');
      return;
    }
  
    try {
      const manipulatedImage = await manipulateAsync(
        image,
        [{ flip: 'horizontal' }],
        { format: 'png', invert: true }
      );
  
      setFilteredImageUri(manipulatedImage.uri);
      console.log('Image converted to negative successfully.');
    } catch (error) {
      console.log('Failed to convert image to negative:', error);
      // Handle the error
    }
  };
  




  useEffect(() => {
    if (route.params.image) {
      setImage(route.params.image);
    }
  }, [route.params.image]);

  const saveImageToGallery = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert('Image saved successfully to gallery.');
        // You can show a success message or perform any other actions here
      } catch (error) {
        console.log('Failed to save image:', error);
        // You can show an error message or handle the error in an appropriate way
      }
    } else {
      console.log('No image selected.');
      // You can show a message or handle the case when no image is selected
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fill colors to your memories</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('home')}>
        <Icon name="arrow-back" size={24} color={primaryColor} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: filteredImageUri }} />
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.btn} onPress={()=> convertNegativeImage()}>
          <Text style={{ color: '#fff' }}>Apply Conversion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={saveImageToGallery}>
          <Text style={{ color: '#fff' }}>Save</Text>
          <Icon name="arrow-down" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {Filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.filter, selectedFilter === filter.name && styles.selectedFilter]}
            onPress={() => applyFilter(filter.name)}
          >
            <Text style={styles.filterText}>{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Filters = [
  { name: 'Filter 1' },
  { name: 'Filter 2' },
  { name: 'Filter 3' },
  { name: 'Filter 4' },
  { name: 'Filter 5' },
  { name: 'Filter 6' },
  { name: 'Filter 7' },
  { name: 'Filter 8' },
  { name: 'Filter 9' },
  { name: 'Filter 10' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  heading:  {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 16,
    color: primaryColor,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 332,
    height: Dimensions.get('window').height / 1.5,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  filter: {
    height: 80,
    width: 88,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: neutral100Color,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  selectedFilter: {
    backgroundColor: neutral100Color,
    borderColor: primaryColor,
    borderWidth: 2,
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 16 : 40,
    left: 20,
    zIndex: 1,
  },
  btn: {
    backgroundColor: primaryColor,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    marginHorizontal: 8,
    flexDirection: 'row',
  },
});

export default FilterComponent;

