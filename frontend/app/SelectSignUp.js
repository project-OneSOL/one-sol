import { StyleSheet, View, Text, Alert, Button, Pressable } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { TitleContainer } from "../components/TitleContainer";
import { Header } from "../components/Header";
import { CustomTextField } from "../components/TextField";
import { useState } from "react";
import { ipAddress } from "../dtos/request/api/Connection";

export const SelectSignUp = ({ navigation }) => {
  return (
    <Background>
        <View style={styles.headContainer}>
            <TitleContainer
            text1="회원 가입"
            text2="회원 유형을 선택해주세요."
            ></TitleContainer>
        </View>

      <View style={styles.bodyContainer}>
        <Pressable
            style = {styles.blueBtn}
          onPress={() => {
            // 일반 유저 회원가입
            navigation.push("SignUp", { screen: "SignUp" })
            }}
        >
            <Text style = {styles.btnText}>일반 유저로 회원가입</Text>
        </Pressable>
        <Pressable
            style = {styles.navyBtn}
            onPress={() => {
              // 점주 유저 회원가입
              navigation.push("OwnerSignUp", { screen: "OwnerSignUp" })
            }}
        >
            <Text style = {styles.btnText}>점주로 회원가입</Text>
        </Pressable>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    flex:1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  bodyContainer: {
    flex:3,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 80
  },
  blueBtn: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: palette.main,
    borderRadius: 20,
    width: 240,
    height: 120,
    margin: 20
  },
  navyBtn: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: palette.navy,
    borderRadius: 20,
    width: 240,
    height: 120,
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
