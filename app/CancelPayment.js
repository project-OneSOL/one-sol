import { StyleSheet, View, Text, Alert } from "react-native";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { Ionicons, Octicons } from "@expo/vector-icons";

export const CancelPayment = ({ navigation }) => {
  const onBtnPress = () => {
    // TODO:
  };

  return (
    <Background>
      <TitleContainer text1="결제가 실패했습니다"></TitleContainer>

      <View style={styles.bodyContainer}>
        <Ionicons
          style={styles.cancel}
          name="close-circle-outline"
          size={180}
          color="red"
        />
      </View>

      <View>
        <Button
          title="다시 시도하기"
          type="big"
          onPress={() => navigation.navigate("RequestPay")}
        ></Button>
        <Button
          title="결제 취소하기"
          type="big"
          color="lightblue"
          onPress={() => navigation.navigate("Home")}
        ></Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
});
