import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import StackNavigator from "./index.js";
import { StatusBar } from "expo-status-bar";
import { palette } from "./lib/styles/colorPalette.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import * as Device from "expo-device";
import * as Notifications from 'expo-notifications';
import { useEffect } from "react";
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.main,
  },
};

export default function App() {
  // useEffect(() => {
  //   const registerForPushNotifications = async () => {
  //     try{
  //       const { granted } = await Notifications.requestPermissionsAsync();
  //       if(!granted){
  //         console.log('푸시 알림 권한이 거부되었습니다.');
  //         return ;
  //       }

  //       // Expo 서버로부터 푸시 토큰 가져오기
  //       const token = (await Notifications.getExpoPushTokenAsync()).data;
  //       console.log('Expo Push Token:', token);

  //       // 백엔드 서버애 푸시 토큰을 저장
  //     } catch (error){
  //       console.log('푸시 알림 토큰 생성 중 오류: ', error);
  //     }
  //   };

  //   registerForPushNotifications();
  // }, []);

  return (
    <RecoilRoot>
      <NavigationContainer theme={MyTheme}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="auto" />
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // SafeAreaView를 화면 전체로 확장
    backgroundColor: palette.main, // 원하는 배경색으로 설정
  },
  container: {
    flex: 1, // 내용을 화면 전체로 확장
    justifyContent: "center",
    alignItems: "center",
  },
});
