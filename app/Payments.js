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
import { paymentMemberState, recentState, friendState } from "../atoms";
import { ipAddress } from "../dtos/request/api/Connection";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../atoms";

export const Payments = ({ navigation }) => {
  const accessToken = useRecoilValue(accessTokenState);
  const [paymentMembers, setPaymentMembers] =
    useRecoilState(paymentMemberState); // 함께 결제할 멤버들
  const [recentUsers, setRecentUsers] = useRecoilState(recentState);
  const [friends, setFriends] = useRecoilState(friendState); // 내 친구 전체 목록
  const [dataLoaded, setDataLoaded] = useState(false);

  async function fetchData(apiUrl, setStateFunction) {
    await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + `${accessToken}`,
      },
    }).catch((error) => {
      // Handle any errors that occur during the backend API call
      console.error("my API Error:", error);
    });
  }

    // useEffect(() => {
    //   // Get Friends List
      
    // }, []);
  
    // 화면 렌더링 시, 내 친구 전체 목록 불러오기
    useEffect(() => {
      // Get Friends List
      console.log(paymentMembers);
      fetchData(`http://${ipAddress}/api/friend/${paymentMembers[0].id}/getList`, setFriends);
      fetchData(`http://${ipAddress}/api/search/latest/${paymentMembers[0].id}`, setRecentUsers);
    }, []);

  // 검색한 단어
  const [searchVal, setSearchVal] = useState("");
  // 검색 여부
  const [viewResult, setViewResult] = useState(false);
  // 검색 결과
  const [searchResult, setSearchResult] = useState([]);

  // 친구 추가 bottomsheet Modal
  // const [visible, setVisible] = useState(false);
  // const toggleBottomNavigationView = () => {
  //   setVisible(!visible);
  // };

  useEffect(() => {
    if (searchVal !== "" && recentUsers.length) {
      setViewResult(true);
      setSearchResult(
        recentUsers.filter((item) =>
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
                onPress={() => {
                  const userIndex = paymentMembers.findIndex(
                    (member) => member.id === paymentMember.id
                  );

                  if (userIndex !== -1) {
                    // 이미 목록에 있다면 제거
                    const updatedMembers = [...paymentMembers];
                    updatedMembers.splice(userIndex, 1);
                    setPaymentMembers([updatedMembers]);
                  } else {
                    // 목록에 없다면 추가
                    setPaymentMembers([...paymentMembers, paymentMember]);
                  }
                }}
                onClose={() => {}}
              >
                {paymentMember.name}
                {console.log(paymentMember)}
              </Chip>
            ))}
          </ScrollView>
        </View>
        <View style={styles.friends}>
          {viewResult ? (
            <SearchResult searchResult={searchResult}></SearchResult>
          ) : (
            <FriendSelection
              recentUsers={recentUsers}
              friends={friends}
              navigation={navigation}
            />
          )}
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="다음"
            type="big"
            onPress={() =>
              navigation.push("CheckPayFriend", { screen: "CheckPayFriend", })
            }
            disabled={paymentMembers.length <= 1}
          ></Button>
        </View>
      </View>
      {/* <AddPayFriend
        visible={visible}
        toggleBottomNavigationView={toggleBottomNavigationView}
      ></AddPayFriend> */}
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
