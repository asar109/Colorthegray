import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { primaryColor } from "../assets/Colors";
import SliderComponent from "../components/SliderComponent";
import Footer from "../components/Footer";
import PopupComponent from "../components/PopupComponent";
import MenuComponent from "../components/MenuComponent";

const Home = ({ navigation  }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const [isPopupVisible, setPopupVisible] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setPopupVisible(false);
    });
  
    return unsubscribe;
  }, [navigation]);
  

  const handleCameraPress = () => {
    // Handle camera option selection
    setPopupVisible(false);
  };

  const handleGalleryPress = () => {
    // Handle gallery option selection
    setPopupVisible(false);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Close the menu
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setMenuOpen(false);
      });
    } else {
      // Open the menu
      setMenuOpen(true);
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const getCurrentTime = () => {
    const currentHour = new Date().getHours();
    return currentHour;
  };

  const getWishing = () => {
    const currentHour = getCurrentTime();
    let wishing = "";

    if (currentHour < 12) {
      wishing = "Good Morning";
    } else if (currentHour < 18) {
      wishing = "Good Afternoon";
    } else if (currentHour < 22) {
      wishing = "Good Evening";
    } else {
      wishing = "Good Night";
    }

    return wishing;
  };

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialIcons name="menu" size={30} style={styles.menuBtn} />
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Hey, John!</Text>
            <Text style={styles.wishing}>{getWishing()}</Text>
          </View>
        </View>
        <SliderComponent />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPopupVisible(true)}
          >
            <Text style={styles.buttonText}>Convert Negative Image</Text>
          </TouchableOpacity>
          <PopupComponent
            isVisible={isPopupVisible}
            onCameraPress={handleCameraPress}
            onGalleryPress={handleGalleryPress}
            onClose={handleClosePopup}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPopupVisible(true)}
          >
            <Text style={styles.buttonText}>Convert Grayscale Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPopupVisible(true)}
          >
            <Text style={styles.buttonText}>Convert Grayscale Video</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Footer />
      {isMenuOpen && (
        <Animated.View
          style={[
            styles.menuContainer,
            { transform: [{ translateX: menuTranslateX }] },
          ]}
        >
          <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} style={styles.closeIcon} />
          </TouchableOpacity>
          <View>
            <MenuComponent style={styles.menuContent} />
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: primaryColor,
    paddingLeft: 16,
    paddingRight: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  wishing: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  menuBtn: {
    color: "#fff",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 240,
    height: 50,
    backgroundColor: primaryColor,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  menuContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    left: 0,
    width: "70%",
    height: "100%",
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  menuContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
  },
  closeIcon: {
    color: "#000",
  },
});
