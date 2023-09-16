import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/Button";
import { Background } from "../components/Background";
import { TitleContainer } from "../components/TitleContainer";
import { Title } from "../components/Title";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { UserCard } from "../components/UserCard";
import { Chip } from "react-native-paper";
import {
  MemorizedUserCardWithMoney,
  UserCardWithMoney,
} from "../components/UserCardWithMoney";
import { useRecoilState } from "recoil";
import { paymentMemberState } from "../atoms";
import { IosAlertStyle } from "expo-notifications";
import { ipAdress } from "../dtos/request/api/Connection";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function sendPushNotification(expoPushToken) {
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
    sound: "default",
    title: "정산 요청! 📬",
    body: "결제 요청을 수락해주세요!",
    data: { someData: "투썸플레이스 10000원 결제 요청" },
  };

  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (err) {
    console.log(err);
  }
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

    token = (await Notifications.getExpoPushTokenAsync()).data;
    // token = await Notifications.getExpoPushTokenAsync({
    //     projectId: "4b7a8e7d-ab26-4f41-9cb9-eaaf03325a73",
    // });
    console.log(token);
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

export const DividePay = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("noti---");
        console.log(notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("res---");
        console.log(response);
      });

    return () => {
      if (
        typeof notificationListener.current !== "undefined" &&
        typeof responseListener.current !== "undefined"
      ) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  // const onBtnPress = () => {
  //     async () => {
  //         await sendPushNotification(expoPushToken);
  //     }
  // };
  const [paymentMember, setPaymentMembers] = useRecoilState(paymentMemberState);

  const totalPrice = 40000;
  const data = [
    {
      id: 1,
      name: "이동현",
      amount: 10000,
      status: "INIT",
      cardNumber: "111-222-333",
      cardExpirationYear: "25",
      cardExpirationMonth: "04",
      customIdentityNumber: "990830",
    },
    {
      id: 2,
      name: "박기련",
      amount: 10000,
      status: "INIT",
      cardNumber: "222-333-444",
      cardExpirationYear: "26",
      cardExpirationMonth: "08",
      customIdentityNumber: "950803",
    },
    {
      id: 3,
      name: "최민수",
      amount: 10000,
      status: "COMPLETE",
      cardNumber: "333-444-555",
      cardExpirationYear: "28",
      cardExpirationMonth: "12",
      customIdentityNumber: "990215",
    },
    {
      id: 4,
      name: "김현정",
      amount: 10000,
      status: "COMPLETE",
      cardNumber: "333-444-555",
      cardExpirationYear: "28",
      cardExpirationMonth: "12",
      customIdentityNumber: "990215",
    },
  ];

  const paymentMemberRequest = {
    totalPrice: totalPrice,
    paymentMembers: data,
  };

  useEffect(() => {
    console.log("rerender");
    setPaymentMembers(data);
  }, []);

  let memberAmountSum = Number(getSumOfAmount(paymentMembers));

  return (
    <Background>
      <View style={styles.container}>
        <TitleContainer
          text1="가격을 분배해주세요 !"
          text2="1/N 또는 수동으로 가격을 입력할 수 있습니다."
        ></TitleContainer>
        <View style={styles.row}>
          <Title
            style={styles.rowItems}
            text="총 40,000원"
            size="mid"
            weight="bold"
          ></Title>
          <Button
            style={styles.rowItems}
            title="초기화"
            type="small"
            onPress={() => {}}
          ></Button>
        </View>
      </View>

      <View style={styles.friends}>
        <View style={styles.friendsList}>
          <ScrollView vertical showsHorizontalScrollIndicator={false}>
            {paymentMembers.map((paymentMember, idx) => (
              <MemorizedUserCardWithMoney
                key={idx}
                idx={idx}
                style={styles.friend}
                name={paymentMember.name}
                bankName={paymentMember.bankName}
                cardNumber={paymentMember.cardNumber}
                amount={String(paymentMember.amount)}
                isEditable={true}
              ></MemorizedUserCardWithMoney>
            ))}
          </ScrollView>
        </View>
        <View style={styles.memberTotalAmount}>
          <Text>
            {"총합: "} {memberAmountSum} {"원"}
          </Text>
        </View>
      </View>

      <Button
        style={styles.checkBtn}
        title="확인"
        type="big"
        onPress={async () => {
          if (isValidTotalPrice(Number(getSumOfAmount(paymentMembers)), totalPrice)) {
            // push notification
            await sendPushNotification(expoPushToken);

            // api call (init)
            await fetch(`http://${ipAdress}/api/payments/init`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentMemberRequest),
            })
              .then((response) => response.json)
              .then((processedData) => {
                // Handle the processed data from your backend here
                console.log("last data= ", processedData);
              })
              .catch((error) => {
                // Handle any errors that occur during the backend API call
                console.error("my API Error:", error);
              });

            navigation.navigate("MemberPayment");
          } else {
            showConfirmation();
          }
        }}
      />
    </Background>
  );
};
const showAlert = (
  title,
  message,
  buttons = [{ text: "확인" }],
  options = { cancelable: false }
) => {
  Alert.alert(title, message, buttons, options);
};

// 사용 예제
const showConfirmation = () => {
  const buttons = [
    {
      text: "확인",
      onPress: () => {
        console.log("확인 버튼을 눌렀습니다.");
      },
    },
    {
      text: "취소",
      onPress: () => {
        console.log("취소 버튼을 눌렀습니다.");
      },
      style: "cancel",
    },
  ];

  showAlert(
    "가격 분배 오류!",
    "가격의 총 합이 점주가 요청한 금액과 일치하지 않습니다.",
    buttons,
    { cancelable: false }
  );
};

function getSumOfAmount(members) {
  const sum = members.reduce((acc, m) => acc + m.amount, 0);
  console.log(sum);

  return sum;
}

function isValidTotalPrice(sum, totalPrice) {
  if (sum !== totalPrice) return false;
  return true;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  search: {
    flex: 1,
  },
  friends: {
    flex: 2,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowItems: {
    padding: 10,
    margin: 10,
  },
  checkBtn: {
    marginBottom: 20,
  },
  chips: {
    marginVertical: 10,
  },
  chip: {
    margin: 3,
    backgroundColor: "transparent",
    borderColor: palette.lightblue,
    borderWidth: 1,
  },
  friend: {},
  friendsList: {
    paddingHorizontal: 6,
    flexDirection: "column",
  },
  memberTotalAmount: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
