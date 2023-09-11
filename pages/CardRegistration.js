import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { BottomSheet } from 'react-native-btr';

export const CardRegistration = () => {
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  return (
    <View style={styles1.container}>
      <View style={[styles1.box, styles1.box1]}>
        <Text style={styles1.smalltext}>
          올해 더치페이로 받은 세액공제 금액
        </Text>
        <Text style={styles1.money}>0원</Text>
      </View>
      <View style={[styles1.box, styles1.box2]}>
        <Title
          text="언제 어디서든 정산 없이 QR 하나로 더치페이하고 소득공제 받아보세요!"
          size="mid"
        ></Title>
        <View style={styles1.texts}>
          <Text>1. 같이 결제할 멤버를 초대한다.</Text>
          <Text>2. QR을 생성한다.</Text>
          <Text>3. 멤버들이 모두 수락하면 결제한다.</Text>
        </View>
        <Button title="더치페이 하러가기" type="big"></Button>
      </View>
      <View style={[styles1.box, styles1.box3]}>
        <View style={styles1.top}>
          <Title text="대표 카드" size="small"></Title>
          <Button
            title="등록"
            type="small"
            onPress={toggleBottomNavigationView}></Button>
        </View>
        <Text style={styles1.emptytext}>대표 카드를 등록해주세요</Text>
      </View>
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
        >
        <View style={styles1.box4}>
          <Title text="대표 카드" size="big"></Title>
          <View style={[styles1.box, styles1.box5]}>
            <Text style={styles1.emptytext}>대표 카드를 등록해주세요</Text>
          </View>
          <Text style={styles1.realsmalltext}>+ 카드 추가</Text>
          <View style={styles1.buttonContainer}>
            <Button title="취소" type="small" />
            <Button title="확인" type="small" />
          </View>
        </View>
      </BottomSheet>
    </View>    
  );
};

const styles1 = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row', // 버튼을 가로로 정렬합니다.
    justifyContent: 'space-between', // 버튼 사이에 공간을 동일하게 분배합니다.
    marginTop: 16, // 버튼과 텍스트 사이에 간격을 조절합니다.
  },
  container: {
    marginTop: 20,
    padding: 20,
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: palette.bg,
    borderTopLeftRadius: 40,
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
  box4: {
    borderRadius: 30,
    flex: 0.38,
    backgroundColor: palette.white,
    paddingHorizontal: 30,
  },
  box5: {
    borderRadius: 30,
    flex: 0.25,
    borderColor: "lightgray",
    borderWidth: 1,
    paddingVertical: 20,
    justifyContent: "center",
  },
  smalltext: {
    color: palette.white,
    fontSize: 14,
  },
  realsmalltext: {
    color: palette.blue,
    fontSize: 12,
    justifyContent: "center",
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
