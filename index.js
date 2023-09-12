import React, { useCallback, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, View, Text, Image } from "react-native";
import { palette } from "./lib/styles/colorPalette";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Divide } from "./pages/Divide";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  useEffect(() => {
    async function prepare() {
      setAppIsReady(true);
    }
    async function prepare() {
      try {
        SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
      }
    }
    prepare();
  }, []);

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
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          },
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Divide"
        component={Divide}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          }
        }}
      ></Stack.Screen>
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
