import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRecoilState } from "recoil";
import { paymentMemberState } from "../atoms";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { TitleContainer } from "../components/TitleContainer";
import { CardRegistration } from "./CardRegistration";

export const MemberPayment = ({ navigation, route }) => {
  const {totalPrice} = route.params;
  const [paymentMembers, setPaymentMembers] = useRecoilState(paymentMemberState);

  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  return (
    <Background>
      <View style={styles.container}>
        <TitleContainer text1="결제 요청을 수락하시겠습니까?"></TitleContainer>
        <View style={styles.moneyContainer}>
          <Title
            text="투썸플레이스 역삼역점"
            size="small"
            weight="semibold"
            style={styles.title}
          ></Title>
          <Title text="10,000원" size="huge"></Title>
          <Title
            text={`총 결제 금액 ${totalPrice}원 (총 ${paymentMembers.length}명)`}
            size="small"
            weight="semibold"
            style={styles.title}
          ></Title>
        </View>
        <View style={styles.cardContainer}>
          <Card />
          <Button
            title="다른 카드 선택하기"
            type="mid"
            color="transparent"
            onPress={toggleBottomNavigationView}
          />
        </View>
        <View>
          <Button
            title="보내기"
            onPress={() => navigation.navigate("RequestPay")}
          ></Button>
          <Button
            title="거절하기"
            color="lightblue"
            onPress={() => navigation.navigate("Home")}
          ></Button>
        </View>
      </View>
      <CardRegistration
        visible={visible}
        toggleBottomNavigationView={toggleBottomNavigationView}
        navigation={navigation}
      ></CardRegistration>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  moneyContainer: {
    flex: 0.5,
    alignItems: "center",
  },
  title: {
    fontsize: 10,
  },
  cardContainer: {},
});
