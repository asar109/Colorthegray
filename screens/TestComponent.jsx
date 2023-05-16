import React, { useState, useEffect } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const TestComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission not granted');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.cancelled) {
        const fileName = result.uri.split('/').pop();
        const destinationUri = `${FileSystem.documentDirectory}${fileName}`;

        await FileSystem.copyAsync({
          from: result.uri,
          to: destinationUri,
        });

        setSelectedImage(destinationUri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginBottom: 20 }} />
      )}
      <Button title="Select Image" onPress={pickImage} />
    </View>
  );
};

export default TestComponent;
