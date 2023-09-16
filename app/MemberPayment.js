import { StyleSheet, View, Text } from "react-native";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { TitleContainer } from "../components/TitleContainer";

export const MemberPayment = () => {
  return (
    <Background>
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
          text="총 결제 금액 40,000원 (총 4명)"
          size="small"
          weight="semibold"
          style={styles.title}
        ></Title>
      </View>
      <View></View>
      <View>
        <Button title="보내기"></Button>
        <Button title="거절하기" color="lightblue"></Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  moneyContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontsize: 10,
  },
});
