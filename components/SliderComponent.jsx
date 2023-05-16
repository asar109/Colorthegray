import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { primaryColor, neutral100Color } from "../assets/Colors";

const SliderComponent = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { width: screenWidth } = Dimensions.get("window");
  const sliderRef = React.useRef(null);

  const handleSlideChange = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / screenWidth);
    if (slide !== activeSlide) {
      setActiveSlide(slide);
    }
  };

  const scrollToSlide = (slideIndex) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        x: slideIndex * screenWidth,
        animated: true,
      });
      setActiveSlide(slideIndex);
    }
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeSlide && styles.activeDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={sliderRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleSlideChange}
      >
        <Image
          style={styles.image}
          source={require("../assets/image1.jpg")}
        />
        <Image
          style={styles.image}
          source={require("../assets/image1.jpg")}
        />
        <Image
          style={styles.image}
          source={require("../assets/image1.jpg")}
        />
      </ScrollView>
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginVertical : 10,
    marginHorizontal : 20,
  },
  image: {
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height /4,
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: neutral100Color,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: primaryColor,
    width: 16,
  },
});

export default SliderComponent;
