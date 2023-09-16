import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { SearchBar } from "../components/SearchBar";
import { AddPayFriend } from "./AddPayFriend";
import { SearchResult } from "./SearchResult";
import { FriendSelection } from "./FriendSelection";
import { ActivityIndicator, Chip } from "react-native-paper";
import { useRecoilState } from "recoil";
import { memberState } from "../atoms";
import { paymentMemberState } from "../atoms";

export const Payments = ({ navigation }) => {
  const members = useRecoilState(memberState); // members
  const [paymentMembers, setPaymentMembers] =
    useRecoilState(paymentMemberState); // 함께 결제할 멤버들

  const initialData = [
    { name: "이동현", phone: "010-1234-5678" },
    { name: "박기련", phone: "010-1234-5678" },
    { name: "최민수", phone: "010-1234-5678" },
    { name: "김현정", phone: "010-1234-5678" },
  ];

  // 함께 결제할 회원 (초기값: 자기 자신)
  // const [members, setMembers] = useState([
  //   { name: "이동현", phone: "010-1234-5678" },
  // ]);

  // 검색한 단어
  const [searchVal, setSearchVal] = useState("");
  // 검색 여부
  const [viewResult, setViewResult] = useState(false);
  // 검색 결과
  const [searchResult, setSearchResult] = useState([]);

  // 친구 추가 bottomsheet Modal
  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (searchVal !== "") {
      setViewResult(true);
      setSearchResult(
        initialData.filter((item) =>
          item.name.toLowerCase().includes(searchVal.toLowerCase())
        )
      );
    } else {
      setViewResult(false);
    }
  }, [searchVal]);

  return (
    <Background>
      <View style={styles.container}>
        <TitleContainer
          text1="누구와 함께 계산하시나요?"
          text2="함께 결제할 인원을 선택해주세요"
          text3={`${paymentMembers.length}명`}
        ></TitleContainer>
        <View style={styles.searchContainer}>
          <SearchBar
            text="이름 검색"
            setSearchVal={setSearchVal}
            searchVal={searchVal}
          />
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
          {viewResult ? (
            <SearchResult
              searchVal={searchVal}
              searchResult={searchResult}
            ></SearchResult>
          ) : (
            <FriendSelection
              toggleBottomNavigationView={toggleBottomNavigationView}
            />
          )}
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="다음"
            type="big"
            onPress={() =>
              navigation.push("CheckPayFriend", { screen: "CheckPayFriend" })
            }
            disabled={paymentMembers.length <= 1}
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
  btnContainer: {},
});
