import { StyleSheet, View, Image } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={require("../assets/1SOL_logo.png")} />
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
// export default function Header() {
//   return (
//     <View style={styles.background}>
//       <View style={styles.header}>
//         <Image
//           style={styles.logo}
//           source={require("../assets/1SOL_logo.png")}
//         />
//         <View style={styles.topRight}>
//           <Octicons
//             style={{ paddingHorizontal: 20 }}
//             name="bell-fill"
//             size={24}
//             color="white"
//           />
//           <Ionicons name="person" size={24} color="white" />
//         </View>
//       </View>
//     </View>
//   );
// }

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
    marginTop: 60,
    height: 40,
  },
  logo: {},
  topRight: {
    flexDirection: "row",
  },
});
