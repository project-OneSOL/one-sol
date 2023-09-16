import { StyleSheet, View, Text, Pressable } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Ionicons } from "@expo/vector-icons";
import { paymentMemberState } from "../atoms";
import { useRecoilState } from "recoil";
import { Button } from "./Button";
import { FlatList } from "react-native";

export const UserList = ({ data }) => {
  const renderItem = ({ item }) => {
    return (
      <UserCard name={item.name} phone={item.phone}>
        <Button title="친구 추가" type="small" color="blue"></Button>
      </UserCard>
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
    />
  );
};

export const UserCard = (props) => {
  const { name, phone, checked, children, user } = props;
  const [paymentMembers, setPaymentMembers] =
    useRecoilState(paymentMemberState);

  const handlePress = () => {
    // 사용자가 이미 목록에 있는지 확인
    const userIndex = paymentMembers.findIndex(
      (member) => member.id === user.id
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
  };

  return (
    <View
      style={[styles.container, checked ? palette.blue : palette.lightblue]}
    >
      <View style={styles.basic}>
        <Pressable onPress={handlePress}>
          <Ionicons
            style={styles.profile}
            name="person-circle-sharp"
            size={30}
            color="black"
          />
          <View style={styles.info}>
            <Text>{name}</Text>
            <Text>{phone}</Text>
          </View>
        </Pressable>
      </View>
      <View>{children}</View>
    </View>
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
