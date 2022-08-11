import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { AntDesign } from "@expo/vector-icons";

function clamp(value: number, min: number, max: number) {
  "worklet";
  return Math.min(Math.max(value, min), max);
}

const BUTTON_WIDTH = 160;

const CounterButton: React.FC = () => {
  const [count, setCount] = useState(0);

  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  const maxSlide = BUTTON_WIDTH * 0.3;

  const incrementCount = useCallback(() => {
    setCount((prevState) => prevState + 1);
    setTimeout(() => {
      scale.value = withSpring(1);
    }, 50);
  }, []);

  const decrementCount = useCallback(() => {
    setCount((prevState) => prevState - 1);
    setTimeout(() => {
      scale.value = withSpring(1);
    }, 50);
  }, []);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = clamp(event.translationX, -maxSlide, maxSlide);
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      scale.value = withSpring(1.3);

      if (translateX.value === maxSlide) {
        runOnJS(incrementCount)();
      }

      if (translateX.value === -maxSlide && count != 0) {
        runOnJS(decrementCount)();
      }
    });

  const rCenterStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const rMinusAndPlusStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-maxSlide, 0, maxSlide],
      [0.4, 0.8, 0.4]
    );
    return {
      opacity,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, rTextStyle]}>
        Add to cart: {count}
      </Animated.Text>
      <View style={styles.buttonContainer}>
        <Animated.View style={rMinusAndPlusStyle}>
          <AntDesign name="minus" size={24} color="white" />
        </Animated.View>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.centerButton, rCenterStyle]} />
        </GestureDetector>
        <Animated.View style={rMinusAndPlusStyle}>
          <AntDesign name="plus" size={24} color="white" />
        </Animated.View>
      </View>
    </View>
  );
};

export default CounterButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#444b6f",
  },
  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 25,
    color: "white",
  },
  buttonContainer: {
    width: BUTTON_WIDTH,
    height: 60,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#303858",
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.15,
    elevation: 5,
  },
  centerButton: {
    backgroundColor: "#444b6f",
    width: 45,
    height: 45,
    borderRadius: 25,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
  },
});
