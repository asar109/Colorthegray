import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const NavigationScreen = () => {
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Configure the animation
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [opacityValue]);

  return (
    <Animated.View style={[styles.container, { opacity: opacityValue }]}>
      <Text style={styles.title}>Navigation Screen</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default NavigationScreen;
