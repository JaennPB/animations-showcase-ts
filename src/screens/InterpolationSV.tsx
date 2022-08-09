import { Dimensions, StyleSheet } from "react-native";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import InterpolationPage from "../components/InterpolationPage";

const MESSAGES = ["Hello!", "Welcome", "to", "my", "shop!"];

const { width } = Dimensions.get("window");

const InterpolationSV = () => {
  const translateX = useSharedValue(0);
  const scrollHandlerX = useAnimatedScrollHandler({
    onScroll: (e) => {
      translateX.value = e.contentOffset.x;
    },
  });

  return (
    <Animated.ScrollView
      horizontal
      style={styles.container}
      onScroll={scrollHandlerX}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={width}
    >
      {MESSAGES.map((word, index) => {
        return (
          <InterpolationPage
            key={index}
            title={word}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

export default InterpolationSV;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
