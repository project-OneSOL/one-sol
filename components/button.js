import { StyleSheet, Pressable, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";

export const Button = (props) => {
  // const { onPress, title = 'Save' } = props;
  const {
    title,
    type = "big",
    color = "blue",
    onPress,
    disabled = false,
  } = props;
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
              borderRadius: 20,
              paddingVertical: 22,
              paddingHorizontal: 68,
            }
          : type === "mid"
          ? {
              // borderRadius: 20,
              padding: 10,
              backgroundColor: "transparent",
              // backgroundColor: palette.lightgray,
            }
          : {},
        color == "blue"
          ? { backgroundColor: palette.blue }
          : { backgroundColor: palette.lighterblue },
        disabled && { backgroundColor: palette.lightblue },
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
                // color: palette.gray,
                color: palette.blue,
                fontSize: 15,
              }
            : {},
          color === "blue" ? {} : { color: palette.blue },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    // backgroundColor: palette.blue,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    // elevation: 3,
  },
  btntext: {
    color: palette.white,
    fontWeight: "bold",
    fontSize: 18,
    // letterSpacing: 0.25,
    // lineHeight: 21,
  },
});
