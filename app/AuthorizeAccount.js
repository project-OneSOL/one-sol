import { StyleSheet, View, Text, Alert } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { Header } from "../components/Header";
import { CustomTextField } from "../components/TextField";
import { useState, useCallback } from "react";
import * as React from "react";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";

export const AuthorizeAccount = () => {
    const [account, setAccount] = useState("");
    const [bank, setBank] = useState("");
  
    const [itemOpen, setItemOpen] = useState(false);
    const [itemValue, setItemValue] = useState(null);
    const [items, setItems] = useState([
        {label: '신한', value: '088'},
        {label: 'KB국민', value: '004'},
        {label: '우리', value: '020'},
        {label: 'KEB하나', value: '081'},
        {label: 'SC제일', value: '023'},
        {label: '경남', value: '039'},
        {label: '광주', value: '034'},
        {label: '대구', value: '031'},
        {label: '부산', value: '032'},
        {label: '전북', value: '037'},
        {label: '제주', value: '035'},
        {label: '기업', value: '003'},
        {label: 'NH농협', value: '011'},
        {label: '수협', value: '007'}
    ]);

  const handleAccountChange = (account) => {
    setAccount(account);
  };
  
  // 확인 버튼 누르면 백엔드 API 호출
  const onBtnPress = () => {
    const requestData = {
      dataHeader: {
        apikey: "2023_Shinhan_SSAFY_Hackathon"
      },
      dataBody: {
        "입금은행코드": itemValue,
        "입금계좌번호": account,
      }
    };

    // 예금주 실명조회 API 호출
    fetch('https://shbhack.shinhan.com/v1/search/name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data from the backend here
        console.log(data);
        sendToBackend(data);
      })
      .catch(error => {
        // Handle any errors that occur during the API call
        console.error('API Error:', error);
      });
  };

  // 백엔드 로직으로 넘기기
  const sendToBackend = (data) => {
    console.log("백엔드로! ", JSON.stringify(data));
    fetch('http://localhost:9000/accounts/api/authorizeAccountOwner', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // .then(response => response.json())
    .then(response => console.log("응답 json= " , response.json()))
    .then(processedData => {
        // Handle the processed data from your backend here
        console.log("last data= ", processedData);
    })
    .catch(error => {
        // Handle any errors that occur during the backend API call
        console.error('Backend API Error:', error);
    });
  }
  
  return (
    <View style={styles1.container}>
      <View style={styles1.titleContainer}>
        <View style={styles1.title}>
          <Title text="계좌 인증" size="big"></Title>
        </View>
        <View style={styles1.subTitle}>
          <Title
            text="계좌 정보를 입력해주세요."
            size="small"
            color="gray"
          ></Title>
        </View>
          </View>
    
    <View style={styles1.container}>
      <DropDownPicker
        items={items}
        open={itemOpen}
        value={itemValue}
        setOpen={setItemOpen}
        setValue={setItemValue}
        defaultIndex={0}
        containerStyle={{ height: 60 }}
        placeholder={'은행 선택'}
      />
    </View>

      <View style={styles1.bodyContainer}>
        <View style={styles1.textField}>
          <CustomTextField
            placeholder="계좌 번호"
            maxLength={40}
            onChangeText={handleAccountChange}
            value={account}
          ></CustomTextField>
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
    marginBottom: 80,
  },
  title: {
    justifyContent: "center",
    fontWeight: "900",
    alignItems: "center",
    paddingBottom: 5,
  },
  subTitle: {
    justifyContent: "center",
    alignItems: "center",
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
