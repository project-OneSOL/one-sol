import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { palette } from "./lib/styles/colorPalette";
import { StyleSheet, View, Image } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import { SignUp } from "./pages/SignUp";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      //   headerMode="screen"
      // screenOptions={{
      //   headerShown: false,
      //   headerMode: "screen",
      //   header: () => <Header />,
      //   // headerTitle: () => (
      //   //   <Image
      //   //     style={styles.logo}
      //   //     source={require("./assets/img/1SOL_logo.png")}
      //   //   />
      //   // ),
      // }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home}
        options = {{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          },
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options = {{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          }
        }}
      >

      </Stack.Screen>
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

