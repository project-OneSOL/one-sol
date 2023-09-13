import { StyleSheet, View, Image } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import Logo from "../assets/img/Logo";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Logo />
      <View style={styles.topRight}>
        <Octicons
          style={{ paddingHorizontal: 20 }}
          name="bell-fill"
          size={24}
          color="white"
        />
        <Ionicons name="person" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1845FF",
    marginTop: 60,
    height: 40,
    paddingHorizontal: 10,
  },
  topRight: {
    flexDirection: "row",
    paddingRight: 10,
  },
  logo: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
});
