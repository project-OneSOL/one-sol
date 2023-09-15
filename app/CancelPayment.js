import { StyleSheet, View, Text, Alert } from "react-native";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { Ionicons, Octicons } from "@expo/vector-icons";

export const CancelPayment = () => {

  const onBtnPress = () => {
    // TODO: 

  };

  return (
    <Background>
      <TitleContainer
        text1="결제가 실패했습니다"
      ></TitleContainer>

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
          title="확인"
          type="big"
          onPress={onBtnPress}
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
