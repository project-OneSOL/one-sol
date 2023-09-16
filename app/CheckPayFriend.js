import { StyleSheet, View, ScrollView } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { TitleContainer } from "../components/TitleContainer";
import { DoubleButton } from "../components/DoubleButton";
import { UserList } from "../components/UserCard";
import { paymentMemberState } from "../atoms";
import { useRecoilState } from "recoil";

export const CheckPayFriend = ({ navigation }) => {
  const [paymentMembers, setPaymentMembers] =
    useRecoilState(paymentMemberState);
  return (
    <Background>
      <TitleContainer
        text1="함께 결제할 멤버"
        text2="함께 결제할 멤버를 확인해주세요."
        text3={paymentMembers.length + "명"}
      ></TitleContainer>
      <UserList users={paymentMembers} />
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
