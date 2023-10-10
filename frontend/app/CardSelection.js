import * as React from "react";
import { useState } from "react";

import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/Button.js";
import { Title } from "../components/Title.js";
import { TitleContainer } from "../components/TitleContainer";

import { Background } from "../components/Background";

export const CardSelection = ({ navigation }) => {
  // 3x3 짜리 신한카드 박스들의 데이터
  const shinhancardData = [
    { id: 1, name: "신한카드" },
    { id: 2, name: "KB국민카드" },
    { id: 3, name: "삼성카드" },
    { id: 4, name: "현대카드" },
    { id: 5, name: "NH농협카드" },
    { id: 6, name: "우리카드" },
    { id: 7, name: "하나카드" },
    { id: 8, name: "롯데카드" },
    { id: 9, name: "IBK기업은행" },
    { id: 10, name: "씨티카드" },
    { id: 11, name: "SC카드" },
    { id: 12, name: "BC 바로카드" },
  ];
  const [selectedCard, setSelectedCard] = useState(null);
  return (
    <Background>
      <TitleContainer text1="추가할 카드를 선택해주세요" />
      <FlatList
        style={styles.card}
        data={shinhancardData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // 3열로 구성
        renderItem={({ item }) => (
          <Pressable
            style={styles.box}
            onPress={() => {
              console.log("선택한 데이터:", item);
              setSelectedCard(item.name);
              console.log(selectedCard);
            }}
          >
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
      <Button
        title="확인"
        type="big"
        onPress={() => navigation.push("CardInfo", {cardName: selectedCard})}
      ></Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 50,
  },
  box: {
    // 신한카드
    flex: 10,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.lightgray,
    borderColor: palette.lightgray,
    borderRadius: 10,
    borderWidth: 1,
    width: 200,
    height: 60,
  },
});
