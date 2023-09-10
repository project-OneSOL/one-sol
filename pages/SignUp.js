import { StyleSheet, View, Text, Alert } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/button";
import { Title } from "../components/title";
import { Header } from "../components/Header";
import {CustomTextField} from "../components/textField";
import { useState } from "react";

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleNameChange = (name) => {
    setName(name);
  };
  const handleEmailChange = (email) => {
    setEmail(email);

    // 이메일 유효성 검사
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailPattern.test(email)){
      setEmailError('올바른 이메일 형식입니다.');
      setIsEmailError(false);
    } else {
      setEmailError('이메일 형식이 올바르지 않습니다. xxx@domain.com');
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
    if(password === confirmPassword){
      setpasswordError('비밀번호가 일치합니다.');
      setIsPasswordError(false);
    } else {
      setpasswordError('비밀번호가 일치하지 않습니다.');
      setIsPasswordError(true);
    }
  }

  const onBtnPress = () => {

  }



  return (
    <View style={styles1.container}>
      <View style={styles1.titleContainer}>
        <View style={styles1.title}>
            <Title
                text="회원 가입" 
                size="big"
            ></Title>
        </View>
        <View style={styles1.subTitle}>
            <Title
                text="회원 가입에 필요한 정보를 입력해주세요."
                size="small"
                color="gray"
            ></Title>
        </View>
      </View>

        <View style={styles1.bodyContainer}>
          <View style={styles1.textField}>
            <CustomTextField
              placeholder = "이름을 입력해주세요."
              maxLength = {40}
              onChangeText={handleNameChange}
              value={name}
            ></CustomTextField>
          </View>
          <View style={styles1.textField}>
            <CustomTextField
              placeholder= "이메일을 입력해주세요."
              maxLength={40}
              onChangeText={handleEmailChange}
              value={email}
            ></CustomTextField>
            <Text style={ isEmailError ? styles1.errorText : styles1.successText}>{emailError}</Text>
          </View>
          <View style={styles1.textField}>
            <CustomTextField
              placeholder= "비밀번호를 입력해주세요."
              maxLength={40}
              onChangeText={handlePasswordChange}
              value={password}
              isHidden = {true}
            ></CustomTextField>
          </View>
          <View style={styles1.textField}>
            <CustomTextField
              placeholder= "비밀번호 확인"
              maxLength={40}
              onChangeText={handleConfirmPasswordChange}
              value={confirmPassword}
              isHidden = {true}
            ></CustomTextField>
            <Text style={ isPasswordError ? styles1.error : styles1.successText}>{passwordError}</Text>
          </View>
        </View>

        <View>
          <Button
            title = '확인'
            type = 'big'
            onPress = {onBtnPress}
            disabled = {true}
          ></Button>
        </View>

    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: palette.bg,
    borderTopLeftRadius: 40,
  },
  titleContainer: {
    justifyContent: "center",
    alignContent: "flex-start",
  },
  bodyContainer: {
    justifyContent: "center",
    alignContent: "flex-start",
    marginBottom: 80
  },
  title: {
    justifyContent: "center",
    fontWeight: "900",
    alignItems: "center",
    paddingBottom: 5
  },
  subTitle: {
    justifyContent: "center",
    alignItems : "center",
  },
  textField: {
    padding: 10
  },
  errorText: {
    color: 'red',
  },
  successText: {
    color: 'green',
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
