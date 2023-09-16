import axios from "axios";
import { StyleSheet, View, Text, Alert } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { Header } from "../components/Header";
import { CustomTextField } from "../components/TextField";
import { useState } from "react";
import { ipAddress } from "../dtos/request/api/Connection";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleNameChange = (name) => {
    setName(name);
  };
  const handleEmailChange = (email) => {
    setEmail(email);

    // 이메일 유효성 검사
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailPattern.test(email)) {
      setEmailError("올바른 이메일 형식입니다.");
      setIsEmailError(false);
    } else {
      setEmailError("이메일 형식이 올바르지 않습니다. xxx@domain.com");
      setIsEmailError(true);
    }
  };
  const handlePasswordChange = (password) => {
    setPassword(password);
  };
  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    validatePassword(password, confirmPassword);
  };

  const validatePassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
      setpasswordError("비밀번호가 일치합니다.");
      setIsPasswordError(false);
    } else {
      setpasswordError("비밀번호가 일치하지 않습니다.");
      setIsPasswordError(true);
    }
  };

  const onBtnPress = async () => {
    const memberData = {
      name: name,
      email: email,
      password: password
    };
    // console.log(JSON.stringify(memberData));

    await fetch(`http://${ipAddress}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    })
      .then(response => response.json)
      .then((processedData) => {
        // Handle the processed data from your backend here
        console.log("last data= ", processedData);
      })
      .catch((error) => {
        // Handle any errors that occur during the backend API call
        console.error("my API Error:", error);
      });
  };

  return (
    <Background>
      <TitleContainer
        text1="회원 가입"
        text2="회원 가입에 필요한 정보를 입력해주세요."
      ></TitleContainer>

      <View style={styles.bodyContainer}>
        <View style={styles.textField}>
          <CustomTextField
            placeholder="이름을 입력해주세요."
            maxLength={40}
            onChangeText={handleNameChange}
            value={name}
          ></CustomTextField>
        </View>
        <View style={styles.textField}>
          <CustomTextField
            placeholder="이메일을 입력해주세요."
            maxLength={40}
            onChangeText={handleEmailChange}
            value={email}
          ></CustomTextField>
          <Text style={isEmailError ? styles.errorText : styles.successText}>
            {emailError}
          </Text>
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
        <View style={styles.textField}>
          <CustomTextField
            placeholder="비밀번호 확인"
            maxLength={40}
            onChangeText={handleConfirmPasswordChange}
            value={confirmPassword}
            isHidden={true}
          ></CustomTextField>
          <Text style={isPasswordError ? styles.error : styles.successText}>
            {passwordError}
          </Text>
        </View>
      </View>

      <View>
        <Button
          title="확인"
          type="big"
          onPress={onBtnPress}
          // disabled={true}
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
  errorText: {
    color: "red",
  },
  successText: {
    color: "green",
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
