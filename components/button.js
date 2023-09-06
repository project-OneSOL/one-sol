import { StyleSheet, Pressable, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";

export const Button = (props) => {
  // const { onPress, title = 'Save' } = props;
  const { title, type, onPress, disabled = "false" } = props;
  // const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={[
        styles.btn,
        type === "small"
          ? {
              borderRadius: 14,
              padding: 10,
            }
          : type === "big"
          ? {
              borderRadius: 18,
              paddingVertical: 18,
              paddingHorizontal: 32,
            }
          : type === "mid"
          ? {
              borderRadius: 20,
              padding: 10,
              backgroundColor: palette.lightgray,
            }
          : {},
        !disabled && { backgroundColor: palette.lightblue },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.btntext,
          type === "small"
            ? {
                fontSize: 12,
              }
            : type === "mid"
            ? {
                color: palette.gray,
                fontSize: 15,
              }
            : {},
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: palette.blue,
    alignItems: "center",
    justifyContent: "center",
    // elevation: 3,
  },
  btntext: {
    color: palette.white,
    fontWeight: "bold",
    fontSize: 16,
    // letterSpacing: 0.25,
    // lineHeight: 21,
  },
});
