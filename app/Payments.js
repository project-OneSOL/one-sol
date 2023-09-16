import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { Title } from "../components/Title";
import { SearchBar } from "../components/SearchBar";
import { ActivityIndicator, Chip } from "react-native-paper";
import { UserCard } from "../components/UserCard";
import { AddPayFriend } from "./AddPayFriend";
import { useRecoilState } from "recoil";
import { memberState } from "../atoms";
import { paymentMemberState } from "../atoms";
import { friendState } from "../atoms";
import { ipAddress } from "../dtos/request/api/Connection";

export const Payments = ({ navigation }) => {
  const members = useRecoilState(memberState); // members 
  const [paymentMembers, setPaymentMembers] = useRecoilState(paymentMemberState); // 함께 결제할 멤버들
  const [friends, setFriends] = useRecoilState(friendState); // 내 친구 전체 목록 

  // 화면 렌더링 시, 내 친구 전체 목록 불러오기
  useEffect(() => {
    // Get Friends List
    async function fetchData(){
      await fetch(`http://${ipAddress}/api/friend/1/getList`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      })
        .then(response => response.json())
        .then((processedData) => {
          // Handle the processed data from your backend here
          console.log("last data= ", processedData);
          setFriends(processedData);
        })
        .catch((error) => {
          // Handle any errors that occur during the backend API call
          console.error("my API Error:", error);
        });
    }

    fetchData();
  }, []);

  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  
  return (
    <Background>
      <View style={styles.container}>
        <TitleContainer
          text1="누구와 함께 계산 하시나요?"
          text2="함께 결제할 인원을 선택해주세요"
          text3={friends.length + "명"}
        ></TitleContainer>
        <View style={styles.searchContainer}>
          <SearchBar text="이름 또는 핸드폰 번호 검색" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chips}
          >
            {paymentMembers.map((paymentMember, idx) => (
              <Chip
                key={idx}
                style={styles.chip}
                onPress={() => console.log("Pressed", paymentMember)}
                onClose
              >
                {paymentMember}
              </Chip>
            ))}
          </ScrollView>
        </View>
        <View style={styles.friends}>
          <View style={styles.top}>
            <View style={styles.switchTitle}>
              <View style={styles.title}>
                <Title text="최근" size="mid" weight="semibold"></Title>
              </View>
              <View style={styles.title}>
                <Title text="친구 목록" size="mid" weight="semibold"></Title>
              </View>
            </View>
            <Button
              styles={styles.addBtn}
              title="+ 친구 추가"
              type="mid"
              onPress={toggleBottomNavigationView}
            ></Button>
          </View>
          <ScrollView showsVerticalScrollIndicator="false">
            <View style={styles.friendsList}>
              {friends.length === 0 ? (
                <ActivityIndicator size="large" color="blue"/>
              ) : (
                friends.map((friend, idx) => (
                  <UserCard
                    key = {idx}
                    style={styles.friend}
                    name={friend.name}
                    phone={friend.phoneNumber}
                  ></UserCard>
                ))
              )}
            </View>
          </ScrollView>
        </View>
        
        <View style={styles.btnContainer}>
          <Button title="다음" type="big"
          onPress={() =>
            navigation.push("CheckPayFriend", { screen: "CheckPayFriend" })
          }
          ></Button>
        </View>
      </View>
      <AddPayFriend
        visible={visible}
        toggleBottomNavigationView={toggleBottomNavigationView}
      ></AddPayFriend>
    </Background>
    
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    // justifyContent: "space-evenly",
  },
  searchContainer: {
    // paddingVertical: 10,
    // paddingHorizontal: 10,
  },
  chips: {
    // marginHorizontal: 10,
    marginVertical: 10,
  },
  chip: {
    margin: 3,
    backgroundColor: "transparent",
    borderColor: palette.lightblue,
    borderWidth: 1,
  },
  friends: {
    flex: 1,
    paddingVertical: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  switchTitle: {
    flex: 0.9,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginRight: 10,
  },
  addBtn: {
    alignSelf: "flex-end",
  },
  friendsList: {
    paddingHorizontal: 6,
    flexDirection: "column",
  },
  friend: {},
  btnContainer: {},
});
