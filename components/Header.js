import { StyleSheet, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import Logo from "../assets/img/Logo";

export const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => navigation.navigate("Home", { screen: "Home" })}
      >
        <Logo />
      </Pressable>
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
