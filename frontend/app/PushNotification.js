import React, { useState, useEffect, useRef } from "react";
import { ipAddress } from "../dtos/request/api/Connection";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  
  async function sendPushNotification(expoPushToken, paymentMembers) {
    console.log(expoPushToken);

    // get PaymentMembers Expo Push Tokens 


    await Notifications.scheduleNotificationAsync({
        to: expoPushToken,
        content: {
            sound: 'default',
            title: '정산 요청! 📬',
            body: '결제 요청이 되었습니다.',
            data: { data: '10000원 결제해주세요.' },
        },
        trigger: {seconds: 2},
    });
  
    // const message = {
    //   to: expoPushToken,
    //   sound: "default",
    //   title: "정산 요청! 📬",
    //   body: "결제 요청을 수락해주세요!",
    //   data: { someData: "투썸플레이스 10000원 결제 요청" },
    // };
  
    // try {
    //   fetch("https://exp.host/--/api/v2/push/send", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Accept-encoding": "gzip, deflate",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(message),
    //   })
    //   .then((response) => {
    //     console.log(response.json());
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  }


  async function registerForPushNotificationAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
  
      // token = (await Notifications.getExpoPushTokenAsync()).data;
      token = (await Notifications.getExpoPushTokenAsync({
          projectId: "4b7a8e7d-ab26-4f41-9cb9-eaaf03325a73"
      })).data;
      console.log("make token: " + token);
      
  
    } else {
      alert("Must use physical device for Push Notifications");
    }
  
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  
    return token;
  }

  export { sendPushNotification, registerForPushNotificationAsync };
