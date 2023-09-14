import { StyleSheet, View, ScrollView } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { TextField } from "../components/TextField";
import { Title } from "../components/Title";
import { SearchBar } from "../components/SearchBar";
import { Chip } from "react-native-paper";
import { UserCard } from "../components/UserCard";
import { CustomTextField } from "../components/TextField";

import { BottomSheet } from "react-native-btr";
import { DoubleButton } from "../components/DoubleButton";
import { UserList } from "../components/UserList";

export const CheckPayFriend = () => {
  return (
    <Background>
      <TitleContainer
        text1="함께 결제할 친구"
        text2="함께 결제할 친구를 확인해주세요."
        text3="2명"
      ></TitleContainer>
        <UserList />
        <DoubleButton />
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
