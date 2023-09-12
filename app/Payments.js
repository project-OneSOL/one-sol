import { StyleSheet, View, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";

export const Payments = () => {
  return (
    <Background>
      <View style={styles.container}>
        <TitleContainer
          text1="누구와 함께 계산 하시나요?"
          text2="함께 결제할 인원을 선택해주세요"
          text3="명"
        ></TitleContainer>
        <View style={styles.search}></View>
        <View style={styles.friends}></View>
      </View>
    </Background>
  );
};

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
  },
});
