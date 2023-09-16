import React from "react";
import { Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { TitleContainer } from "../components/TitleContainer";
import { UserCardWithMoney } from "../components/UserCardWithMoney";
import { useRecoilState } from "recoil";
import { paymentMemberState } from "../atoms";
import { CustomProgressBar } from "../components/ProgressBar";
import { DoubleButton } from "../components/DoubleButton";

export const RequestPay = ({ navigation }) => {
  const [members, setMembers] = useRecoilState(paymentMemberState);

  const totalPrice = 40000;

  // useEffect(() => {
  //     console.log("rerender");
  //     setMembers(data);
  // }, []);

  let memberAmountSum = Number(getSumOfAmount(members));
  // "COMPLETE" 상태인 항목 수 계산
  const completedCount = members.filter(
    (item) => item.status === "COMPLETE"
  ).length;

  // 진행률 계산
  const progress = completedCount / members.length;

  return (
    <Background>
      <View style={styles.container}>
        <TitleContainer
          text1="요청이 진행중입니다"
          text2="더치 페이 요청 받은 모두가 수락하면 결제가 진행됩니다."
        ></TitleContainer>
        <View>
          <Text>
            {members.length}중 {completedCount}명 완료
          </Text>
        </View>
        <View style={styles.row}>
          <CustomProgressBar progress={progress}></CustomProgressBar>
        </View>
      </View>

      <View style={styles.friends}>
        <View style={styles.friendsList}>
          <ScrollView vertical showsHorizontalScrollIndicator={false}>
            {members.map((member, idx) => (
              <UserCardWithMoney
                key={idx}
                idx={idx}
                style={styles.friend}
                name={member.name}
                bankName={member.bankName}
                cardNumber={member.cardNumber}
                amount={String(member.amount)}
                isEditable={false}
              ></UserCardWithMoney>
            ))}
          </ScrollView>
        </View>
        <View style={styles.memberTotalAmount}>
          <Text>
            {"총합: "} {memberAmountSum} {"원"}
          </Text>
        </View>
      </View>

      <DoubleButton
        press1={() => {
          navigation.goBack();
        }}
        press2={() => {
          navigation.navigate("CompletePayment");
          // navigation.navigate("CancelPayment");
        }}
      ></DoubleButton>
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
