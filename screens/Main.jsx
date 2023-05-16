import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Home"
import Login from "./Login"
import SignUp from "./SingUp";
import GoogleComponent from "./Google";
import FilterComponent from "./FilterComponent"
import CameraComponent from "../components/Camera"
import ImagePickerComponent from "../components/ImagePicker"

const Stack = createNativeStackNavigator();
const Home = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="home"  component={HomeScreen} options={{headerShown : false}}/>
        <Stack.Screen name="login" component={Login} options={{headerShown : false}} />
        <Stack.Screen name="signup" component={SignUp} options={{headerShown : false}} />
        <Stack.Screen name="google" component={GoogleComponent} options={{headerShown : false}} />
        <Stack.Screen name="filter" component={FilterComponent} options={{headerShown : false}} />
        <Stack.Screen name="pick/image" component={ImagePickerComponent} options={{headerShown : false}} />
        <Stack.Screen name="camera" component={CameraComponent} options={{headerShown : false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Home;

const styles = StyleSheet.create({});
