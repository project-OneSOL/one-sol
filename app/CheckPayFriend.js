import { StyleSheet, View, ScrollView } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { TitleContainer } from "../components/TitleContainer";
import { DoubleButton } from "../components/DoubleButton";
import { UserList } from "../components/UserList";

export const CheckPayFriend = ({ navigation }) => {
  return (
    <Background>
      <TitleContainer
        text1="함께 결제할 멤버"
        text2="함께 결제할 멤버를 확인해주세요."
        text3="2명"
      ></TitleContainer>
      <UserList />
      <DoubleButton
        press1={() => navigation.goBack()}
        press2={() => navigation.push("ScanQR", { screen: "ScanQR" })}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flex: 0.4,
    backgroundColor: palette.white,
    paddingHorizontal: 20,
  },
  title: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  textField: {
    padding: 10,
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
