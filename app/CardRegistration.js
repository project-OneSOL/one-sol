import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { BottomSheet } from "react-native-btr";
import { DoubleButton } from "../components/DoubleButton";
import { ipAddress } from "../dtos/request/api/Connection";
import { accessTokenState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

const fetchRepresentativeCard = async (accessToken) => {
  try {
    const response = await fetch(`http://${ipAddress}/accounts/representativeCard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${accessToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data; // 서버에서 받은 데이터 반환
    } else {
      console.error("대표 카드 정보를 불러오는 중 오류 발생:", response.status);
      return null;
    }
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    Alert.alert("오류 발생", "서버 요청 중 오류가 발생했습니다.");
    return null;
  }
};

export const CardRegistration = ({
  visible,
  toggleBottomNavigationView,
  navigation,
}) => {
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
    // 컴포넌트가 마운트될 때와 visible 상태가 변경될 때마다 데이터를 다시 불러옵니다.
    if (visible) {
      loadRepresentativeCard();
    }
  }, [visible]);

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={() => toggleBottomNavigationView}
      onBackdropPress={toggleBottomNavigationView}
    >
      <View style={styles.container}>
        <View style={styles.title}>
          <Title text="대표 카드" size="mid" />
        </View>
        <TouchableOpacity // TouchableOpacity로 변경
          style={[
            styles.cardbox,
            !isCardboxPressed && styles.cardboxPressed, // cardbox가 눌린 상태일 때 테두리 스타일을 적용합니다.
          ]}
          onPress={() => setIsCardboxPressed(!isCardboxPressed)} // cardbox를 눌렀을 때 상태를 변경합니다.
        >
          {representativeCard ? (
            <>
              <Title
                text="신한카드 Deep Dream Platinum+"
                size="small"
              />
              <Text>신한카드 {representativeCard.cardNumber} </Text>
            </>
          ) : (
            <Title
              text="대표 카드를 등록해주세요"
              size="small"
              weight="light"
              color="gray"
            />
          )}
        </TouchableOpacity>
        <View style={styles.addButton}>
          <Button
            title="카드 추가"
            type="mid"
            color="transparent"
            onPress={() => {
              toggleBottomNavigationView();
              navigation.push("CardSelection", { screen: "CardSelection" });
            }}
          ></Button>
        </View>
        <DoubleButton
          press1={() => toggleBottomNavigationView()}
          press2={() => toggleBottomNavigationView()}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flex: 0.4,
    backgroundColor: palette.white,
    paddingHorizontal: 20,
  },
  title: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  cardbox: {
    borderRadius: 20,
    borderColor: palette.lightblue,
    borderWidth: 2,
    paddingVertical: 30,
    alignItems: "center",
  },
  cardboxPressed: {
    borderColor: palette.blue, // cardbox가 눌린 상태일 때 파란색 테두리를 적용합니다.
  },
  addButton: {
    paddingTop: 7,
  },
});
