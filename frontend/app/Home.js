import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { ipAddress } from "../dtos/request/api/Connection";
import { accessTokenState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { CardRegistration } from "./CardRegistration";
import { fetchRepresentativeCard } from "./GetCardInfo";

export const Home = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [representativeCard, setRepresentativeCard] = useState(null);
  const [isCardboxPressed, setIsCardboxPressed] = useState(false); // cardbox를 눌렀을 때 상태를 관리합니다.
  const accessToken = useRecoilValue(accessTokenState);

  const loadRepresentativeCard = async () => {
    try {
      const cardInfo = await fetchRepresentativeCard(accessToken);
      if (cardInfo) {
        setRepresentativeCard(cardInfo);
      }
    } catch (error) {
      console.error("대표 카드 정보를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (!visible) {
      loadRepresentativeCard();
    }
  });

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <Background>
      <View style={[styles.box, styles.box1]}>
        <Text style={styles.smalltext}>올해 더치페이로 받은 세액공제 금액</Text>
        <Text style={styles.money}>0원</Text>
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
          {representativeCard ? (
            <>
            <Title
              text= {representativeCard.cardName}
              size="small"
            />
            <Text>신한카드 {representativeCard.cardNumber} </Text>
            </>
          ) : (
            <Text style={styles.emptytext}>대표 카드를 등록해주세요</Text>
          )}
      </View>
      <View style={[styles.box, styles.box2]}>
        <Title
          text="언제 어디서든 정산 없이 QR 하나로 더치페이하고 소득공제 받아보세요!"
          size="mid"
        ></Title>
        <View style={styles.texts}>
          <Text>1. 같이 결제할 멤버를 초대한다.</Text>
          <Text>2. QR을 스캔한다.</Text>
          <Text>3. 멤버들이 모두 수락하면 결제된다.</Text>
        </View>
        <Button
          title="더치페이 하러가기"
          type="big"
          onPress={() => navigation.push("Payments", { screen: "Payments" })}
        ></Button>
      </View>
      <CardRegistration
        visible={visible}
        toggleBottomNavigationView={toggleBottomNavigationView}
        navigation={navigation}
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
