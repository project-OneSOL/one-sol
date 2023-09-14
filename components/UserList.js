import { StyleSheet, View, ScrollView } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { UserCard } from "./UserCard";

export const UserList = () => {
  const users = ["이동현", "박기련", "최민수", "김현정"];
  return (
    <ScrollView bounces="false" showsVerticalScrollIndicator="false">
      <View style={styles.friendsList}>
        {users.map((user) => (
          <UserCard
            style={styles.friend}
            name={user}
            phone="010-1234-5678"
          ></UserCard>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  friendsList: {
    paddingHorizontal: 6,
    flexDirection: "column",
  },
  friend: {},
});
