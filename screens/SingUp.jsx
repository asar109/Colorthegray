import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
} from "react-native";
import logo from "../assets/Logo.png";
import google from "../assets/google-color-icon.png";
import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import IoniCons from "react-native-vector-icons/Ionicons";
import {
  primaryColor,
  neutral500Color,
  neutral100Color,
} from "../assets/Colors";
import Entypo from "react-native-vector-icons/Entypo";

const SignUp = ({ navigation }) => {
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    // Configure the animation
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 850,
      useNativeDriver: true,
    }).start();
  }, [opacityValue]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <Animated.View style={{ flex: 1, opacity: opacityValue }}>
      <KeyboardAvoidingView
        style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}
        behavior="padding"
      >
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={logo} />
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <IoniCons
                    name="person-outline"
                    style={{ fontSize: 22, color: neutral500Color }}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  activeUnderlineColor="#000"
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Icon name="envelope" style={styles.icon} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  activeUnderlineColor="#000"
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <Icon name="lock" style={styles.icon} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  activeUnderlineColor="#000"
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  style={styles.eyeIconContainer}
                  onPress={togglePasswordVisibility}
                >
                  <Entypo
                    name={isPasswordVisible ? "eye-with-line" : "eye"}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.btn_container}>
            <Text style={styles.signUp_btn}>Create account</Text>
          </TouchableOpacity>
          <Text
            style={{ color: neutral500Color, textAlign: "center", margin: 24 }}
          >
            Or
          </Text>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={styles.googleBtnContainer}>
              <Text>
                <Image
                  style={{ width: 18, height: 18, marginRight: 16 }}
                  source={google}
                />{" "}
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 80,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>
              Have an account?{" "}
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={{ color: primaryColor, fontWeight: "bold" }}>
                  {" "}
                  Log in
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  inputContainer: {
    marginTop: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.5,
    width: 300,
    borderBottomColor: neutral500Color,
  },
  iconContainer: {
    marginRight: 4,
  },
  icon: {
    fontSize: 24,
    color: neutral500Color,
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomColor: "black",
  },
  inputLabel: {
    fontWeight: "bold",
  },
  eyeIconContainer: {
    marginLeft: 8,
  },
  eyeIcon: {
    fontSize: 24,
    color: neutral500Color,
  },
  btn_container: {
    backgroundColor: primaryColor,
    width: 300,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  signUp_btn: {
    color: "#fff",
    fontWeight: "bold",
  },
  googleBtnContainer: {
    backgroundColor: neutral100Color,
    width: 225,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;
