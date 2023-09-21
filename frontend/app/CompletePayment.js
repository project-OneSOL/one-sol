import { StyleSheet, View, Text, Alert } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { Ionicons, Octicons } from "@expo/vector-icons";

export const CompletePayment = ({ navigation }) => {
  const onBtnPress = () => {
    // TODO: Login API Call
  };

  return (
    <Background>
      <TitleContainer text1="결제가 완료되었습니다"></TitleContainer>

      <View style={styles.bodyContainer}>
        <Ionicons
          style={styles.check}
          name="checkmark-circle-outline"
          size={180}
          color={palette.main}
        />
      </View>

      <View>
        <Button
          title="확인"
          type="big"
          onPress={() => navigation.navigate("Home")}
        ></Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
});
