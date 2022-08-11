import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";

import CircularProgress from "./src/screens/CircularProgress";
import HomeScreen from "./src/screens/HomeScreen";
import InterpolationSV from "./src/screens/InterpolationSV";
import SlideCounter from "./src/screens/SlideCounter";

type NavParams = {
  HomeScreen: undefined;
  CardScrollView: undefined;
  CardStack: undefined;
  InterpolationScrollView: undefined;
  CircularProgressBar: undefined;
  SlideCounter: undefined;
  LoaderClock: undefined;
};

const Drawer = createDrawerNavigator<NavParams>();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#303858" },
            headerTintColor: "white",
            headerShadowVisible: false,
          }}
        >
          <Drawer.Screen
            name="SlideCounter"
            component={SlideCounter}
            options={{ headerTitle: "Counter", drawerLabel: "Counter" }}
          />

          <Drawer.Screen
            name="CircularProgressBar"
            component={CircularProgress}
            options={{ headerTitle: "Progress", drawerLabel: "Progress" }}
          />
          <Drawer.Screen
            name="InterpolationScrollView"
            component={InterpolationSV}
            options={{
              headerTitle: "Interpolation",
              drawerLabel: "Interpolation",
            }}
          />
          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerTitle: "Home", drawerLabel: "Home" }}
          />

          <Drawer.Screen
            name="CardScrollView"
            component={HomeScreen}
            options={{ headerTitle: "Cards", drawerLabel: "Cards" }}
          />
          <Drawer.Screen
            name="CardStack"
            component={HomeScreen}
            options={{ headerTitle: "Stack", drawerLabel: "Stack" }}
          />
          <Drawer.Screen
            name="LoaderClock"
            component={HomeScreen}
            options={{ headerTitle: "Clock", drawerLabel: "Clock" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
