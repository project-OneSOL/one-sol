import { StyleSheet, View, Text } from "react-native";
import { Button } from "./Button";
import { palette } from "../lib/styles/colorPalette";
import { Ionicons } from "@expo/vector-icons";
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
  const { name, phone, checked, children } = props;

  return (
    <View
      style={[styles.container, checked ? palette.blue : palette.lightblue]}
    >
      <View style={styles.basic}>
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
