import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Pressable, Text } from "react-native";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { UserList } from "../components/UserCard";
import { friendState } from "../atoms";
import { useRecoilState } from "recoil";
import { ipAddress } from "../dtos/request/api/Connection";

export const FriendSelection = ({ toggleBottomNavigationView }) => {
  // 최근 함께 결제한 회원
  const [recentUsers, setRecentUsers] = useState([]);
  const [friends, setFriends] = useRecoilState(friendState); // 내 친구 전체 목록
  const [switchTitle, setSwitchTitle] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  async function fetchData(apiUrl, setStateFunction) {
    await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((processedData) => {
        // Handle the processed data from your backend here
        console.log("last data= ", processedData);
        setStateFunction(processedData);
        // setRecentUsers(processedData);
        setDataLoaded(true);
      })
      .catch((error) => {
        // Handle any errors that occur during the backend API call
        console.error("my API Error:", error);
      });
  }

  useEffect(() => {
    // Get Friends List
    fetchData(`http://${ipAddress}/api/search/latest/1`, setRecentUsers);
  }, []);

  // 친구 목록
  // const friendUsers = [
  //   { name: "최민수", phone: "010-1234-5678" },
  //   { name: "김현정", phone: "010-1234-5678" },
  // ];

  // 화면 렌더링 시, 내 친구 전체 목록 불러오기
  useEffect(() => {
    // Get Friends List
    fetchData(`http://${ipAddress}/api/friend/1/getList`, setFriends);
  }, []);

  return (
    <View>
      <View style={styles.top}>
        <View style={styles.switchTitle}>
          <View style={styles.title}>
            <Pressable onPress={() => setSwitchTitle(false)}>
              <Title
                text="최근"
                size="mid"
                weight="semibold"
                color={switchTitle ? "gray" : "black"}
              ></Title>
            </Pressable>
          </View>
          <View style={styles.title}>
            <Pressable onPress={() => setSwitchTitle(true)}>
              <Title
                text="친구 목록"
                size="mid"
                weight="semibold"
                color={!switchTitle ? "gray" : "black"}
              ></Title>
            </Pressable>
          </View>
        </View>
        <Button
          styles={styles.addBtn}
          title="+ 새로운 친구 추가"
          type="mid"
          color="transparent"
          onPress={toggleBottomNavigationView}
        ></Button>
      </View>
      {/* <ScrollView showsVerticalScrollIndicator="false"> */}
      <View style={styles.friendsList}>
        {switchTitle ? (
          friends.length ? (
            <UserList users={friends} />
          ) : (
            <Text>No friends</Text>
          )
        ) : recentUsers.length ? (
          <UserList users={recentUsers} />
        ) : (
          <Text>No recent users</Text>
        )}
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
