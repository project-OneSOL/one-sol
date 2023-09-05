import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { palette } from "./lib/styles/colorPalette";
import { StyleSheet, View, Image } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      //   headerMode="screen"
      screenOptions={{
        headerShown: false,
        headerMode: "screen",
        header: () => <Header />,
        headerTitle: () => (
          <Image
            style={styles.logo}
            source={require("./assets/1SOL_logo.png")}
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#1845FF",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
    height: 40,
  },
  logo: {},
  topRight: {
    flexDirection: "row",
  },
});
