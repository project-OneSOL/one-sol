import { StyleSheet, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { useFonts } from "expo-font";

export const Title = (props) => {
  const [fontsLoaded] = useFonts({
    NotoSansKR: require("../assets/font/NotoSansKR-VariableFont_wght.ttf"),
  });
  const { text, size, weight = "bold", color = "black" } = props;
  return (
    <Text
      style={[
        styles.text,
        size === "big"
          ? { fontSize: 24 }
          : size === "mid"
          ? { fontSize: 20 }
          : size === "small"
          ? { fontSize: 18 }
          : { fontSize: 16 },
        weight === "bold" && { fontWeight: "bold" },
        color === "black"
          ? { color: palette.black }
          : color === "gray"
          ? { color: palette.gray }
          : color === "blue"
          ? { color: palette.blue }
          : { color: palette.lightgray },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    // fontWeight: "800",
    fontFamily: "NotoSansKR",
    // textAlign: "center",
    // textAlignVertical: "center",
    // paddingTop: 40,
  },
});
