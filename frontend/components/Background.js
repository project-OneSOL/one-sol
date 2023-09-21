import { StyleSheet, View } from "react-native";
import { palette } from "../lib/styles/colorPalette";

export const Background = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: palette.bg,
    borderTopLeftRadius: 40,
  },
});
