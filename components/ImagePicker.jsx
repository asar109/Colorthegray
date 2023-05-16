import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const ImagePickerComponent = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === "granted");

      if (status === "granted") {
        openImagePickerAsync();
      }
    })();
  }, []);

  const openImagePickerAsync = async () => {
    try {
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      return navigation.navigate("filter", { image: uri });
      // if (!cancelled) {
      //   const tempDirectory = FileSystem.cacheDirectory + "temp/";
      //   await FileSystem.makeDirectoryAsync(tempDirectory, { intermediates: true });
      //   const fileName = uri.substring(uri.lastIndexOf("/") + 1);
      //   const tempFilePath = tempDirectory + fileName;
      //   await FileSystem.copyAsync({ from: uri, to: tempFilePath });
      //   navigation.navigate("signup", { image: tempFilePath });
      // }
    } catch (error) {
      console.log("Error selecting image:", error);
      alert("An error occurred while selecting the image.");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to the media library</Text>;
  }

  return <View />;
};

export default ImagePickerComponent;
