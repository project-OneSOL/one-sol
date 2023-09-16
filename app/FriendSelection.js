import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { UserList } from "../components/UserList";

export const FriendSelection = ({ toggleBottomNavigationView }) => {
  // 최근 함께 결제한 회원
  const recentUsers = [{ name: "박기련", phone: "010-1234-5678" }];
  // 친구 목록
  const friendUsers = [
    { name: "최민수", phone: "010-1234-5678" },
    { name: "김현정", phone: "010-1234-5678" },
  ];

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
          onPress={toggleBottomNavigationView}
        ></Button>
      </View>
      <ScrollView showsVerticalScrollIndicator="false">
        <View style={styles.friendsList}>
          {switchTitle ? (
            <UserList users={friendUsers} />
          ) : (
            <UserList users={recentUsers} />
          )}
        </View>
      </ScrollView>
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
