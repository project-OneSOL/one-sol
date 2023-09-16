import { StyleSheet, View, ScrollView } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { UserCard } from "./UserCard";

export const UserList = ({ users }) => {
  return (
    <ScrollView bounces="false" showsVerticalScrollIndicator="false">
      <View style={styles.friendsList}>
        {users.map(({ name, phone }) => (
          <UserCard style={styles.friend} name={name} phone={phone}></UserCard>
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
