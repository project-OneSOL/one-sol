import { StyleSheet, View, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Ionicons } from "@expo/vector-icons";

export const UserCard = (props) => {
  const { name, phone, children } = props;
  return (
    <View style={styles.container}>
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
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: palette.blue,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    marginVertical: 3,
  },
  profile: {
    paddingHorizontal: 5,
  },
  info: {
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
  },
});
