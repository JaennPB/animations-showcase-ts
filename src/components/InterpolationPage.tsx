import { Dimensions, StyleSheet, View } from "react-native";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface Props {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { width } = Dimensions.get("window");

const SQUARE = width * 0.7;

const InterpolationPage: React.FC<Props> = ({ title, index, translateX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyleBox = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, width / 3, 0],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ scale }],
    };
  });

  const rStyleText = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [500, 0, -500],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      translateX.value,
      inputRange,
      [-1, 1, -1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0, 150, 256, 0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyleBox]}>
        <Animated.Text style={[styles.text, rStyleText]}>{title}</Animated.Text>
      </Animated.View>
    </View>
  );
};

export default InterpolationPage;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: SQUARE,
    width: SQUARE,
    backgroundColor: "rgba(0, 150, 256, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 60,
  },
});
