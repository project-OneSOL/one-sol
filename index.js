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
import { CardSelection } from "./app/CardSelection";
import { AuthorizeAccount } from "./app/AuthorizeAccount";
import { SearchResult } from "./app/SearchResult";
import { OwnerPayment } from "./app/OwnerPayment";
import { GenerateQR } from "./app/GenerateQR";
import { Login } from "./app/Login";
import { OwnerSignUp } from "./app/OwnerSignUp";
import { SelectSignUp } from "./app/SelectSignUp";
import { RequestPay } from "./app/RequestPay";
import { CardRegistration } from "./app/CardRegistration";
import { CheckPayFriend } from "./app/CheckPayFriend";
import { CompletePayment } from "./app/CompletePayment";
import { CancelPayment } from "./app/CancelPayment";
import { AddPayFriend } from "./app/AddPayFriend";
import { ScanQR } from "./app/ScanQR";
import { CardInfo } from "./app/CardInfo";

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
      initialRouteName="Home"
      screenOptions={{
        // animation: "none",
        header: () => <Header />,
        headerStyle: {
          backgroundColor: palette.main,
        },
      }}
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
          animation: "none",
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
        name="SelectSignUp"
        component={SelectSignUp}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.navy,
          },
        }}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
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
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="AuthorizeAccount"
        component={AuthorizeAccount}
      ></Stack.Screen>
      <Stack.Screen name="Payments" component={Payments}></Stack.Screen>
      <Stack.Screen
        name="CardRegistration"
        component={CardRegistration}
      ></Stack.Screen>
      <Stack.Screen
        name="CardSelection"
        component={CardSelection}
      ></Stack.Screen>
      <Stack.Screen name="CardInfo" component={CardInfo}></Stack.Screen>
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          animation: "none",
        }}
      ></Stack.Screen>
      <Stack.Screen name="AddPayFriend" component={AddPayFriend}></Stack.Screen>
      <Stack.Screen
        name="CheckPayFriend"
        component={CheckPayFriend}
      ></Stack.Screen>
      <Stack.Screen name="OwnerPayment" component={OwnerPayment}></Stack.Screen>
      <Stack.Screen name="GenerateQR" component={GenerateQR}></Stack.Screen>
      <Stack.Screen name="ScanQR" component={ScanQR}></Stack.Screen>
      <Stack.Screen name="DividePay" component={DividePay}></Stack.Screen>
      <Stack.Screen name="RequestPay" component={RequestPay}></Stack.Screen>
      <Stack.Screen
        name="CompletePayment"
        component={CompletePayment}
      ></Stack.Screen>
      <Stack.Screen
        name="CancelPayment"
        component={CancelPayment}
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
