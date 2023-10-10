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
import { ipAddress } from "../dtos/request/api/Connection";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../atoms";
import { sendPushNotification, registerForPushNotificationAsync } from "./PushNotification"



export const DividePay = ({ navigation, route }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const {totalPrice} = route.params;

  const notificationListener = useRef();
  const responseListener = useRef();
  const [paymentMembers, setPaymentMembers] = useRecoilState(paymentMemberState);
  const accessToken = useRecoilValue(accessTokenState);

  async function fetchData(apiUrl) {
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + `${accessToken}`
      },
    })
      .then((response) => console.log(response))
      .catch((error) => {
        // Handle any errors that occur during the backend API call
        console.error("my API Error:", error);
      });
  }

  useEffect(() => {
    registerForPushNotificationAsync().then((token) => {
      console.log("t: " + token);
      setExpoPushToken(token);
      // fetchData(`http://${ipAddress}/api/pushToken/save`);

      
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

  const paymentMemberRequest = {
    totalPrice: totalPrice,
    paymentMembers: paymentMembers,
  };

  useEffect(() => {
    const n = paymentMembers.length;
    const amountPerNumber = totalPrice / n;
    const updatedPaymentMembers = paymentMembers.map((member) => ({
      ...member,
      amount: amountPerNumber,
    }));
    setPaymentMembers(updatedPaymentMembers);
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
            console.log(paymentMembers);
            // push notification
            console.log(expoPushToken);
            await sendPushNotification(expoPushToken, paymentMembers);

            // api call (init)
            await fetch(`http://${ipAddress}/api/payments/init`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + `${accessToken}`
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

            navigation.navigate("MemberPayment", {totalPrice});
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
