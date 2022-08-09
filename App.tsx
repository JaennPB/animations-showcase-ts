import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";

import HomeScreen from "./src/screens/HomeScreen";
import InterpolationSV from "./src/screens/InterpolationSV";

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
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Drawer.Navigator>
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
            name="CircularProgressBar"
            component={HomeScreen}
            options={{ headerTitle: "Progress", drawerLabel: "Progress" }}
          />
          <Drawer.Screen
            name="SlideCounter"
            component={HomeScreen}
            options={{ headerTitle: "Counter", drawerLabel: "Counter" }}
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
