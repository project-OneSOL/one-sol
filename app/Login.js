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
import { useRecoilState } from "recoil";
import { Title } from "../components/Title";

export const Login = ({ navigation }) => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [memberType, setMemberType] = useState("GENERAL");

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

  const showAlert = (
    title,
    message,
    buttons = [{ text: "확인" }],
    options = { cancelable: false }
  ) => {
    Alert.alert(title, message, buttons, options);
  };

  // 사용 예제
  const showConfirmation = () => {
    const buttons = [
      {
        text: "확인",
        onPress: () => {
          console.log("확인 버튼을 눌렀습니다.");
        },
      },
      {
        text: "취소",
        onPress: () => {
          console.log("취소 버튼을 눌렀습니다.");
        },
        style: "cancel",
      },
    ];

    showAlert("로그인 실패", "존재하지 않는 유저입니다.", buttons, {
      cancelable: false,
    });
  };

  const onBtnPress = async () => {
    // TODO: Login API Call
    const memberData = {
      email: email,
      password: password,
      type: memberType,
    };
    // console.log(JSON.stringify(memberData));

    await fetch(`http://${ipAddress}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    })
      .then((response) => response.json())
      .then((processedData) => {
        console.log(processedData);
        if (processedData.accessToken == undefined) {
          showConfirmation();
          return;
        }
        console.log("Access Token =", processedData.accessToken);
        setAccessToken(processedData.accessToken);
        navigation.navigate("Home");
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
      <View style={styles.toggle}>
        <Pressable
          style={[
            styles.btn,
            memberType === "GENERAL" && { backgroundColor: palette.lightblue },
          ]}
          onPress={handleTypeChangeGeneral}
        >
          <Title
            style={styles.txt}
            text="일반 유저"
            size="small"
            weight="semibold"
            color="blue"
          />
        </Pressable>
        <Pressable
          style={[
            styles.btn,
            memberType === "OWNER" && { backgroundColor: palette.lightblue },
          ]}
          onPress={handleTypeChangeOwner}
        >
          <Title
            style={styles.txt}
            text="점주 유저"
            size="small"
            weight="semibold"
            color="blue"
          />
        </Pressable>
      </View>
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
      </View>
      <View>
        <Button
          title="회원가입 하러가기"
          type="mid"
          color="transparent"
          onPress={() => navigation.navigate("SelectSignUp")}
        ></Button>
        <Button title="확인" type="big" onPress={onBtnPress}></Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  toggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: palette.lightblue,
    marginHorizontal: 70,
    paddingHorizontal: 0,
    borderRadius: 20,
    marginTop: -40,
  },
  btn: {
    padding: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
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
    margin: 20,
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
  btnText: {
    color: palette.white,
    fontWeight: "bold",
    fontSize: 18,
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
