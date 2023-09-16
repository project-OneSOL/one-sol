import { StyleSheet, View } from "react-native";
import { Title } from "./Title";
import { palette } from "../lib/styles/colorPalette";

export const Card = () => {
  return (
    <View style={styles.cardContainer}>
      <Title
        text="신한 Deep Dream Platinum+"
        size="small"
        weight="semibold"
      ></Title>
      <Title
        text="잔액 7,000원"
        size="small"
        weight="semibold"
        color="gray"
      ></Title>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.lightblue,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    justifyContent: "space-between",
  },
});
