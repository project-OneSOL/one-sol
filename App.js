import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import StackNavigator from "./index.js";
import { StatusBar } from "expo-status-bar";
import { palette } from "./lib/styles/colorPalette.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

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
      <SafeAreaView style = {styles.safeArea}>
        <StatusBar style="auto" />
        <StackNavigator />  
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // SafeAreaView를 화면 전체로 확장
    backgroundColor: palette.main, // 원하는 배경색으로 설정
  },
  container: {
    flex: 1, // 내용을 화면 전체로 확장
    justifyContent: 'center',
    alignItems: 'center',
  },
});
