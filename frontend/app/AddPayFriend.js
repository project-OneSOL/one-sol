import { StyleSheet, View } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { CustomTextField } from "../components/TextField";
import { DoubleButton } from "../components/DoubleButton";
import { Background } from "../components/Background";
import { TitleContainer } from "../components/TitleContainer";

export const AddPayFriend = ({
  visible,
  toggleBottomNavigationView,
  navigation,
}) => {
  return (
    <Background>
      <TitleContainer text1="친구 추가" />
      <View style={styles.textField}>
        <CustomTextField placeholder="이름" maxLength={10}></CustomTextField>
        <CustomTextField
          placeholder="핸드폰 번호"
          maxLength={20}
        ></CustomTextField>
      </View>
      <DoubleButton
        press1={toggleBottomNavigationView}
        press2={toggleBottomNavigationView}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  textField: {
    paddingHorizontal: 30,
    justifyContent: "space-around",
  },
  cardbox: {
    borderRadius: 20,
    borderColor: palette.lightblue,
    borderWidth: 2,
    paddingVertical: 30,
    alignItems: "center",
  },
  addButton: {
    paddingTop: 7,
  },
});
