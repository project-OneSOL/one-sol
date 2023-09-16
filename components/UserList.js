import { StyleSheet, View, ScrollView } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { UserCard } from "./UserCard";

export const UserList = ({ users }) => {
  console.log(users);
  return (
    <ScrollView bounces="false" showsVerticalScrollIndicator="false">
      <View style={styles.friendsList}>
        {users.map((user) => (
          <UserCard name={user.name} phone={user.phoneNumber}></UserCard>
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
