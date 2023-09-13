import { StyleSheet, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import {
  useFonts,
  Inter_200ExtraLight,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export const Title = (props) => {
  const [fontsLoaded, fontError] = useFonts({
    Inter_200ExtraLight,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const { text, size = "big", weight = "bold", color = "black" } = props;

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
        weight === "bold"
          ? { fontFamily: "Inter_700Bold" }
          : weight == "semibold"
          ? { fontFamily: "Inter_600SemiBold" }
          : { fontFamily: "Inter_200ExtraLight" },
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
    // textAlign: "center",
    // textAlignVertical: "center",
    // paddingTop: 40,
  },
});
