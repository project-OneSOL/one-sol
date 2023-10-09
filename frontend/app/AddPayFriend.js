import { StyleSheet, View, Alert } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { CustomTextField } from "../components/TextField";
import { DoubleButton } from "../components/DoubleButton";
import { Background } from "../components/Background";
import { TitleContainer } from "../components/TitleContainer";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ipAddress } from "../dtos/request/api/Connection";

export const AddPayFriend = ({
  // visible,
  // toggleBottomNavigationView,
  navigation,
}) => {
  const accessToken = useRecoilValue(accessTokenState);
  const [friendEmail, setFriendEmail] = useState("");
  const handleFriendEmailChange = (friendEmail) => {
    setFriendEmail(friendEmail);
  };

  const onBtnPress = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      console.log("userData: " + jsonValue);
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log("userData email: " + userData.email);

      const requestData = {
        requesterEmail: userData.email,
        friendEmail: friendEmail,
      };

      await fetch(`http://${ipAddress}/friend/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + `${accessToken}`,
        },
        body: JSON.stringify(requestData),
      }).then(() => navigation.navigate("Payments"));
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      Alert.alert("오류 발생", "서버 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <Background>
      <TitleContainer text1="친구 추가" />
      <View style={styles.textField}>
        <CustomTextField placeholder="이름" maxLength={10}></CustomTextField>
        <CustomTextField
          placeholder="핸드폰 번호"
          maxLength={20}
          onChangeText={handleFriendEmailChange}
          value={friendEmail}
        ></CustomTextField>
      </View>
      <DoubleButton press1={() => navigation.goBack()} press2={onBtnPress} />
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
