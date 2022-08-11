import { Button, Dimensions, StyleSheet, View } from "react-native";

import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import Svg, { Circle } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const CIRCLE_LENGTH = 900;

const CircularProgress: React.FC = () => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const animatedText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}%`;
  });

  function startAnimationHandler() {
    progress.value = withTiming(0.75, { duration: 2000 });
  }

  return (
    <View style={styles.container}>
      <ReText
        style={{
          fontSize: 60,
          fontFamily: "Poppins_600SemiBold",
          color: "white",
        }}
        text={animatedText}
      />
      <View style={styles.circle}>
        <Svg>
          <Circle
            cx={width / 2}
            cy={height / 2}
            r={CIRCLE_LENGTH / (2 * Math.PI)}
            strokeWidth={25}
            stroke="#303858"
          />
          <AnimatedCircle
            cx={width / 2}
            cy={height / 2}
            r={CIRCLE_LENGTH / (2 * Math.PI)}
            stroke="#A6E1FA"
            strokeWidth={15}
            strokeDasharray={CIRCLE_LENGTH}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </Svg>
      </View>
      <Button title="Start" onPress={startAnimationHandler} color="white" />
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444b6f",
  },
  circle: {
    position: "absolute",
    width,
    height,
  },
  input: {
    backgroundColor: "white",
    width: "60%",
    borderRadius: 10,
    fontSize: 25,
    padding: 15,
    marginBottom: 10,
  },
});
