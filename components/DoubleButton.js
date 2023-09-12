import { StyleSheet, Pressable, Text, View } from "react-native";
import { palette } from "../lib/styles/colorPalette";

export const DoubleButton = (props) => {
  const { title1 = "취소", title2 = "확인", disabled = false } = props;

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={[styles.btn, { backgroundColor: palette.lightblue }]}>
        <Text style={[styles.btntext, { color: palette.blue }]}>{title1}</Text>
      </Pressable>
      <Pressable
        style={[
          styles.btn,
          disabled
            ? { backgroundColor: palette.lightblue }
            : { backgroundColor: palette.blue },
        ]}
        disabled={disabled}
      >
        <Text style={[styles.btntext, { color: palette.white }]}>{title2}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 68,
  },
  btntext: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
