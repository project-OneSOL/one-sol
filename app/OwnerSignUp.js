import { StyleSheet, View, Text, Alert } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { Header } from "../components/Header";
import { CustomTextField } from "../components/TextField";
import { useState } from "react";
import { ipAdress } from "../dtos/request/api/Connection";

// 점주 유저 회원가입
export const OwnerSignUp = () => {
  const [shopName, setShopName] = useState("");
  const [corpRegisterNum, setCorpRegisterNum] = useState("");
  const [iscorpRegisterNumError, setIsCorpRegisterNumError] = useState(false);
  const [corpRegisterError, setCorpRegisterError] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberError, setIsPhoneNumberError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleShopNameChange = (shopName) => {
    setShopName(shopName);
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };

  const handleCorpRegisterNumChange = (corpRegisterNum) => {
    setCorpRegisterNum(corpRegisterNum);

    // 사업자 등록 번호 유효성 검사
    const corpRegisterNumPattern = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/;
    if(corpRegisterNumPattern.test(corpRegisterNum)){
      setCorpRegisterError("올바른 사업자 등록 번호 형식입니다.");
      setIsCorpRegisterNumError(false);
    } else {
      setCorpRegisterError("올바른 사업자 등록 번호 형식이 아닙니다.");
      setIsCorpRegisterNumError(true);
    }
  }

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
      name: shopName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      corpRegisterNum: corpRegisterNum,
      type: "OWNER"
      
    };
    // console.log(JSON.stringify(memberData));

    await fetch(`http://${ipAdress}/auth/signUp`, {
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
    <Background isOwner={true}>
      <TitleContainer
        text1="회원 가입"
        text2="회원 가입에 필요한 정보를 입력해주세요."
      ></TitleContainer>

      <View style={styles.bodyContainer}>
        <View style={styles.textField}>
          <CustomTextField
            placeholder="가게명을 입력해주세요."
            maxLength={40}
            onChangeText={handleShopNameChange}
            value={shopName}
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
            placeholder="휴대폰 번호를 입력해주세요."
            maxLength={40}
            onChangeText={handlePhoneNumberChange}
            value={phoneNumber}
          ></CustomTextField>
          <Text style={isPhoneNumberError ? styles.errorText : styles.successText}>
            {phoneNumberError}
          </Text>
        </View>
        <View style={styles.textField}>
          <CustomTextField
            placeholder="사업자 번호를 입력해주세요."
            maxLength={40}
            onChangeText={handleCorpRegisterNumChange}
            value={corpRegisterNum}
          ></CustomTextField>
          <Text style={iscorpRegisterNumError ? styles.errorText : styles.successText}>
            {corpRegisterError}
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
    backgroundColor: palette.navy,
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
