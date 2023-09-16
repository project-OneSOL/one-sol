import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Pressable, Text } from "react-native";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { UserList } from "../components/UserCard";
import { friendState, recentState } from "../atoms";
import { useRecoilState } from "recoil";

export const FriendSelection = ({ recentUsers, friends, navigation }) => {
  // 최근 함께 결제한 회원

  const [switchTitle, setSwitchTitle] = useState(false);

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
          onPress={() =>
            navigation.push("AddPayFriend", { screen: "AddPayFriend" })
          }
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
