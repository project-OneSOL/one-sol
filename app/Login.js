import { StyleSheet, View, Text, Alert, Pressable } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { Header } from "../components/Header";
import { CustomTextField } from "../components/TextField";
import { useState } from "react";
import { ipAddress } from "../dtos/request/api/Connection";
import { accessTokenState } from "../atoms/index";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memberType, setMemberType] = useState("");

  const handleEmailChange = (email) => {
    setEmail(email);
  };
  const handlePasswordChange = (password) => {
    setPassword(password);
  };
  const handleTypeChangeGeneral = (memberType) => {
    setMemberType("GENERAL");
    console.log("button Pressed: ", "GENERAL");
  };
  const handleTypeChangeOwner = (memberType) => {
    setMemberType("OWNER");
    console.log("button Pressed: ", "OWNER");
  };

  const onBtnPress = async () => {
    // TODO: Login API Call
    const memberData = {
      email: email,
      password: password,
      type: memberType      
    };
    // console.log(JSON.stringify(memberData));

    await fetch(`http://${ipAddress}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    })
      .then(response => response.json())
      .then((processedData) => {
        console.log("Access Token =", processedData.accessToken);
        accessTokenState.key = processedData.accessToken;
      })
      .catch((error) => {
        // Handle any errors that occur during the backend API call
        console.error("my API Error:", error);
      });
  };

  return (
    <Background>
      <TitleContainer
        text1="로그인"
        text2="아이디(이메일)와 비밀번호를 입력해주세요."
      ></TitleContainer>

      <View style={styles.bodyContainer}>
        <View style={styles.textField}>
          <CustomTextField
            placeholder="이메일을 입력해주세요."
            maxLength={40}
            onChangeText={handleEmailChange}
            value={email}
          ></CustomTextField>
        </View>
        <View style={styles.textField}>
          <CustomTextField
            placeholder="비밀번호를 입력해주세요."
            maxLength={40}
            onChangeText={handlePasswordChange}
            value={password}
            isHidden={true}
          ></CustomTextField>
        </View>
        <Pressable
            style = {styles.blueBtn}
          onPress={handleTypeChangeGeneral} // 일반 유저 로그인
        >
            <Text style = {styles.btnText}>일반 유저</Text>
        </Pressable>
        <Pressable
            style = {styles.navyBtn}
          onPress={handleTypeChangeOwner} // 점주 유저 로그인
        >
            <Text style = {styles.btnText}>점주</Text>
        </Pressable>
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
    alignContent: "flex-start",
    marginBottom: 80,
  },
  textField: {
    padding: 10,
  },
  blueBtn: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: palette.main,
    borderRadius: 20,
    width: 80,
    height: 50,
    margin: 20
  },
  navyBtn: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: palette.navy,
    borderRadius: 20,
    width: 80,
    height: 50,
    margin: 20,
  },
  btnText:{
    color: palette.white,
    fontWeight: "bold",
    fontSize: 18
  },
  box: {
    borderRadius: 30,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: palette.shadow,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {
          height: 0,
          width: 2,
        },
      },
    }),
  },
  box1: {
    flex: 0.09,
    justifyContent: "space-evenly",
    backgroundColor: palette.blue,
  },
  box2: {
    flex: 0.46,
    justifyContent: "space-evenly",
    backgroundColor: palette.white,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  box3: {
    flex: 0.3,
    backgroundColor: palette.white,
    paddingHorizontal: 30,
  },
  smalltext: {
    color: palette.white,
    fontSize: 14,
  },
  money: {
    color: palette.white,
    fontSize: 24,
    fontWeight: "600",
  },
  texts: {
    flex: 1,
    padding: 20,
    justifyContent: "space-evenly",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  emptytext: {
    fontSize: 16,
    color: "lightgray",
    textAlign: "center",
    textAlignVertical: "center",
    paddingTop: 40,
  },
});
