import React, { useCallback, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, View, Text, Image } from "react-native";
import { palette } from "./lib/styles/colorPalette";
import { Header } from "./components/Header";
import { DividePay } from "./app/DividePay";
import { Home } from "./app/Home";
import { Owner } from "./app/Owner";
import { SignUp } from "./app/SignUp";
import { Payments } from "./app/Payments";
import { AuthorizeAccount } from "./app/AuthorizeAccount";
import { SearchFriend } from "./app/SearchFriend";
import { OwnerPayment } from "./app/OwnerPayment";
import { GenerateQR } from "./app/GenerateQR";
import { Login } from "./app/Login";
import { OwnerSignUp } from "./app/OwnerSignUp";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  // const navigation = useNavigation();

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
      initialRouteName="Owner"
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
        name="Owner"
        component={Owner}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.navy,
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
      />
      <Stack.Screen
        name="OwnerSignUp"
        component={OwnerSignUp}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.navy,
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          },
        }}
      />
      <Stack.Screen
        name="AuthorizeAccount"
        component={AuthorizeAccount}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="SearchFriend"
        component={SearchFriend}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="OwnerPayment"
        component={OwnerPayment}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="GenerateQR"
        component={GenerateQR}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          },
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="DividePay"
        component={DividePay}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          },
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
