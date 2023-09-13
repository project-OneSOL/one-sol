import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { CardRegistration } from "./CardRegistration";

export const Owner = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  return (
    <Background>
      <View style={[styles.box, styles.box1]}>
        <Text style={styles.bigtext}>투플레이스 역삼역점</Text>
      </View>
      <View style={[styles.box, styles.box3]}>
        <View style={styles.top}>
          <Title text="대표 카드" size="small"></Title>
          <Button
            title="등록"
            type="small"
            onPress={toggleBottomNavigationView}
          ></Button>
        </View>
        <Text style={styles.emptytext}>대표 카드를 등록해주세요</Text>
      </View>
      <View style={[styles.box, styles.box2]}>
        <Title text="복잡한 결제, QR 하나로 해결하세요!" size="mid"></Title>
        <View style={styles.texts}>
          <Text>1. 금액을 입력한다.</Text>
          <Text>2. QR을 생성한다.</Text>
          <Text>3. 결제 요청하면 자동으로 결제된다.</Text>
        </View>
        <Button title="QR 생성하기" type="big"></Button>
      </View>

      <CardRegistration
        visible={visible}
        toggleBottomNavigationView={toggleBottomNavigationView}
      ></CardRegistration>
    </Background>
  );
};

const styles = StyleSheet.create({
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
  bigtext: {
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
