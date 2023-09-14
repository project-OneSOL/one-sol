import { StyleSheet, View, Text, Alert } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { Header } from "../components/Header";
import { CustomTextField } from "../components/TextField";
import { useState } from "react";

export const RegisterCardInfo = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [isCardNumber, setIsCardNumber] = useState(true);
  const [cardNumberError, setCardNumberError] = useState("");

  const [cardExpirationYear, setCardExpirationYear] = useState("");
  const [isCardExpirationYear, setIsCardExpirationYear] = useState(true);
  const [cardExpirationYearError, setCardExpirationYearError] = useState("");

  const [cardExpirationMonth, setCardExpirationMonth] = useState("");
  const [isCardExpirationMonth, setIsCardExpirationMonth] = useState(true);
  const [cardExpirationMonthError, setCardExpirationMonthError] = useState("");

  const [customerIdentityNumber, setCustomerIdentityNumber] = useState("");
  const [isCustomerIdentityNumber, setIsCustomerIdentityNumber] = useState(true);
  const [customerIdentityNumberError, setCustomerIdentityNumberError] = useState("");


  const handleCardNumberChange = (cardNumber) => {
    setCardNumber(cardNumber);
    // 카드 번호가 16자리가 아닐 경우
    if (cardNumber.length != 16) {
      setIsCardNumber(true)
      setCardNumberError("정확한 카드 번호를 입력해주세요.")
    } else {
      setIsCardNumber(false)
      setCardNumberError("")
    }
  };
  const handleCardExpirationYearChange = (cardExpirationYear) => {
    const today = new Date(); 
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    setCardExpirationYear(cardExpirationYear);
    // 년도가 네자리가 아닐 경우
    if (cardExpirationYear.length != 4) {
      setIsCardExpirationYear(true)
      setCardExpirationYearError("정확한 연도를 입력해주세요.")
    } else if ((parseInt(cardExpirationYear) < todayYear) || (parseInt(cardExpirationYear) == todayYear && parseInt(cardExpirationMonth) < todayMonth)){
      // 과거년도 일 경우 (월까지 계산)
      setIsCardExpirationYear(true)
      setCardExpirationYearError("카드 유효기간이 만료되었습니다. 유효기간을 확인해주세요.")
    } else {
      setIsCardExpirationYear(false)
      setCardExpirationYearError("")
    }
  };
  const handleCardExpirationMonthChange = (cardExpirationMonth) => {
    setCardExpirationMonth(cardExpirationMonth);
    // 월이 0이하거나 13이상일 경우
    if (parseInt(cardExpirationMonth) <= 0 || parseInt(cardExpirationMonth) >= 13) {
      setIsCardExpirationMonth(true)
      setCardExpirationMonthError("유효한 월을 입력해주세요.")
    } else {
      setIsCardExpirationMonth(false)
      setCardExpirationMonthError("")
    }
  };
  const handleCustomerIdentityNumberChange = (customerIdentityNumber) => {
    setCustomerIdentityNumber(customerIdentityNumber)
    // 생년월일이 6자리가 아닐 경우
    if (customerIdentityNumber.length != 6) {
      setIsCustomerIdentityNumber(true)
      setCustomerIdentityNumberError("정확한 주민등록번호 6자리를 입력해주세요.")
    } else {
      setIsCustomerIdentityNumber(false)
      setCustomerIdentityNumberError("")
    }
  };

  const onBtnPress = () => {};

  return (
    <Background>
      <TitleContainer
        text1="카드 정보를 입력해주세요"
      ></TitleContainer>

      <View style={styles.bodyContainer}>
        <View style={styles.textField}>
          <CustomTextField
            placeholder="카드번호"
            maxLength={16}
            onChangeText={handleCardNumberChange}
            value={cardNumber}
          ></CustomTextField>
          <Text style={isCardNumber ? styles.errorText : styles.successText}>
            {cardNumberError}
          </Text>
        </View>
        <View style={styles.textField}>
          <CustomTextField
            placeholder="유효기간 (월)"
            maxLength={2}
            onChangeText={handleCardExpirationMonthChange}
            value={cardExpirationMonth}
          ></CustomTextField>
          <Text style={isCardExpirationMonth ? styles.errorText : styles.successText}>
            {cardExpirationMonthError}
          </Text>
        </View>
        <View style={styles.textField}>
          <CustomTextField
            placeholder="유효기간 (년도)"
            maxLength={4}
            onChangeText={handleCardExpirationYearChange}
            value={cardExpirationYear}
          ></CustomTextField>
          <Text style={isCardExpirationYear ? styles.errorText : styles.successText}>
            {cardExpirationYearError}
          </Text>
        </View>
        <View style={styles.textField}>
          <CustomTextField
            placeholder="생년월일"
            maxLength={6}
            onChangeText={handleCustomerIdentityNumberChange}
            value={customerIdentityNumber}
          ></CustomTextField>
          <Text style={isCustomerIdentityNumber ? styles.errorText : styles.successText}>
            {customerIdentityNumberError}
          </Text>
        </View>
      </View>

      <View>
        <Button
          title="다음"
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
