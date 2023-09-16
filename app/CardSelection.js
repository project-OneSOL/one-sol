import * as React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/Button.js";
import { Title } from "../components/Title.js";
import { TitleContainer } from "../components/TitleContainer";

import { Background } from "../components/Background";

export const CardSelection = ({ navigation }) => {
  // 3x3 짜리 신한카드 박스들의 데이터
  const shinhancardData = [
    { id: 1, name: "신한카드" },
    { id: 2, name: "신한카드" },
    { id: 3, name: "신한카드" },
    { id: 4, name: "신한카드" },
    { id: 5, name: "신한카드" },
    { id: 6, name: "신한카드" },
    { id: 7, name: "신한카드" },
    { id: 8, name: "신한카드" },
    { id: 9, name: "신한카드" },
    { id: 10, name: "신한카드" },
    { id: 11, name: "신한카드" },
    { id: 12, name: "신한카드" },
  ];

  return (
    <Background>
      <TitleContainer text1="추가할 카드를 선택해주세요" />
      <FlatList
        data={shinhancardData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} // 3열로 구성
        renderItem={({ item }) => (
          <View style={styles.box}>
            <Text>{item.name}</Text>
            {/* 추가적인 박스 디자인 및 정보를 여기에 표시할 수 있습니다. */}
          </View>
        )}
      />
      <Button
        title="확인"
        type="big"
        onPress={() => navigation.push("CardInfo")}
      ></Button>
    </Background>
  );
};

const styles = StyleSheet.create({
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
