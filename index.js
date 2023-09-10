import React, { useCallback, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { palette } from "./lib/styles/colorPalette";
import { StyleSheet, View, Text, Image } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading experience.
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately!
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

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
        onLayout={onLayoutRootView}
        options={{
          header: () => <Header />,
          headerStyle: {
            backgroundColor: palette.main,
          },
        }}
      />
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
