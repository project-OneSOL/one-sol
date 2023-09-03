import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";

export default function App() {
  return (
    <View style={styles.background}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Image source={require("./assets/1SOL_logo.png")} />
        <View style={styles.topRight}>
          <Octicons name="bell-fill" size={24} color="white" />
          <Ionicons name="person" size={24} color="white" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#1845FF",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  topRight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
