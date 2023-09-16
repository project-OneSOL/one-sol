import { StyleSheet, View, Text, Pressable } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Ionicons } from "@expo/vector-icons";
import { paymentMemberState } from "../atoms";
import { useRecoilState } from "recoil";
import { Button } from "./Button";
import { FlatList } from "react-native";

export const UserList = ({ users }) => {
  const renderItem = (user) => {
    return (
      <UserCard user={user}>
        <Button title="친구 추가" type="small" color="blue"></Button>
      </UserCard>
    );
  };
  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      // keyExtractor={(item) => item.name}
    />
  );
};

export const UserCard = (props) => {
  
  const { checked, children, user } = props;
  // console.log("user", user);
  const [paymentMembers, setPaymentMembers] =
    useRecoilState(paymentMemberState);

  const handlePress = () => {
    // 사용자가 이미 목록에 있는지 확인
    const userIndex = paymentMembers.findIndex(
      (member) => member.item.id === user.item.id
    );

    if (userIndex !== -1) {
      // 이미 목록에 있다면 제거
      const updatedMembers = [...paymentMembers];
      updatedMembers.splice(userIndex, 1);
      setPaymentMembers(updatedMembers);
    } else {
      // 목록에 없다면 추가
      setPaymentMembers([...paymentMembers, user]);
    }

    // console.log("paymentMembers", ...paymentMembers);
  };

  return (
    <Pressable
      style={[styles.container, checked ? palette.blue : palette.lightblue]} onPress={handlePress}
    >
      <View style={styles.basic}>
          <Ionicons
            style={styles.profile}
            name="person-circle-sharp"
            size={30}
            color="black"
          />
          <View style={styles.info}>
            <Text>{user.item ? user.item.name : user.name}</Text>
            <Text>{user.item ? user.item.phoneNumber : user.phoneNumber}</Text>
          </View>
      </View>
      <View>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
  },
  basic: {
    flexDirection: "row",
    alignItems: "center",
  },
  profile: {
    paddingHorizontal: 5,
  },
  info: {
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
  },
});
