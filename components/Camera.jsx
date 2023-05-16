import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";

const CameraComponent = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const cameraRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (isMounted) {
        setHasPermission(status === "granted");
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        navigation.navigate("signup", { image: uri });
      } catch (error) {
        console.log("Error taking picture:", error);
        alert("An error occurred while taking the picture.");
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to the camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
        <View style={styles.cameraButtonsContainer}>
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <Feather name="camera" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCameraType} style={styles.switchButton}>
            <Feather name="refresh-cw" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    aspectRatio: Dimensions.get("window").width / Dimensions.get("window").height,
  },
  cameraButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 20,
  },
  captureButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#333",
  },
  switchButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
  },
});

export default CameraComponent;
