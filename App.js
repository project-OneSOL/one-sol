import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import StackNavigator from "./index.js";
import { StatusBar } from "expo-status-bar";
import { palette } from "./lib/styles/colorPalette.js";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.main,
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar style="auto" />
      <StackNavigator />
    </NavigationContainer>
  );
}
