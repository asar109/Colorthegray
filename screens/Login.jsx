import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import logo from "../assets/Logo.png";
import google from "../assets/google-color-icon.png";
import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import {
  primaryColor,
  neutral500Color,
  neutral100Color,
  bg_color,
} from "../assets/Colors";
import Entypo from "react-native-vector-icons/Entypo";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";


WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setLoading] = useState(false); // State for loader
  console.log(userInfo)

  const navigateToHome = () => {
    setLoading(false); // Stop the loader
    navigation.navigate("home"); 
  };
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1004056197504-59vtgbc0ghbk49ref8430bupnpfe9c43.apps.googleusercontent.com",
    expoClientId:
      "1004056197504-pabmiqqf4vocptr5h5unbhjvcm74ik8s.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      setLoading(true); // Start the loader
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
      navigateToHome();
    } catch (error) {
      // Add your own error handler here
      alert(error.message);
      setLoading(false); // Stop the loader
    }
  };

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
    <Animated.View style={[{ flex: 1 }, { opacity: opacityValue }]}>
      <KeyboardAvoidingView
        style={{ flex: 1, alignItems: "center", backgroundColor: bg_color }}
        behavior="padding"
      >
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={logo} />
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
            <Text style={styles.login_btn}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: primaryColor }}>Forgot password?</Text>
          </TouchableOpacity>
          <Text
            style={{ color: neutral500Color, textAlign: "center", margin: 24 }}
          >
            Or
          </Text>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.googleBtnContainer}
              onPress={() => promptAsync()}
              disabled={!request}
            >
              <Text>
                <Image
                  style={{ width: 18, height: 18, marginRight: 16 }}
                  source={google}
                />{" "}
                Log in with Google
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={styles.guest_btn_container} onPress={()=>navigation.navigate('home')}>
              <Text style={styles.guest_btn}>Continue as a Guest</Text>
            </TouchableOpacity>
          </View>
          {
          isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      ) : null}
          <View
            style={{
              marginTop: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>
              Don't have an account?{" "}
              <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                <Text style={{ color: primaryColor, fontWeight: "bold" }}>
                  {" "}
                  Create account
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
    fontSize: 30,
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
  guest_btn_container: {
    backgroundColor: "#fff",
    width: 160,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: primaryColor,
  },
  guest_btn: {
    color: primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  login_btn: {
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

export default Login;
