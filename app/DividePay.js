import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

async function sendPushNotification(expoPushToken){
    console.log(expoPushToken);
    // await Notifications.scheduleNotificationAsync({
    //     content: {
    //         sound: 'default',
    //         title: '정산 요청! 📬',
    //         body: '결제 요청이 되었습니다.',
    //         data: { data: '10000원 결제해주세요.' },
    //     },
    //     trigger: {seconds: 2},
    // });

    const message = {
        to: expoPushToken,
        sound: 'default',
        title: '정산 요청! 📬',
        body: '결제 요청을 수락해주세요!',
        data: {someData: '투썸플레이스 10000원 결제 요청'},
    };

    try{
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Accept-encoding': 'gzip, deflate',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    } catch(err){
        console.log(err);
    }
}

async function registerForPushNotificationAsync(){
    let token;
    if(Device.isDevice){
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if(existingStatus !== 'granted'){
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if(finalStatus !== 'granted'){
            alert('Failed to get push token for push notification!');
            return ;
        }

        token =  (await Notifications.getExpoPushTokenAsync()).data;
        // token = await Notifications.getExpoPushTokenAsync({
        //     projectId: "4b7a8e7d-ab26-4f41-9cb9-eaaf03325a73",
        // });
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if(Platform.OS === 'android'){
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
    }

    return token;
}

export const DividePay = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationAsync().then(token => {
            setExpoPushToken(token);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log("noti---");
            console.log(notification);
            setNotification(notification);
          });
      
          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("res---");
            console.log(response);
          });
    
        return () => {
            if(typeof notificationListener.current !== 'undefined' && typeof responseListener.current !== 'undefined'){
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, []);

    // const onBtnPress = () => {
    //     async () => {
    //         await sendPushNotification(expoPushToken);
    //     }
    // };

    return(
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Your expo push token: {expoPushToken.data}</Text>
            <Text>Title: {notification && notification.request.content.title}</Text>
            <Text>Body: {notification && notification.request.content.body}</Text>
            <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            <Button
            title="Press to Send Notification"
            onPress={async () => {
            await sendPushNotification(expoPushToken);
            }}
        />
        </View>
    );
}