import { StyleSheet, View } from "react-native";
import { Title } from "./Title";

export const TitleContainer = (props) => {
  const { text1, text2, text3, text4 } = props;
  return (
    <View style={styles.titleContainer}>
      <View style={styles.title}>
        <Title text={text1} size="big"></Title>
      </View>
      {text2 && (
        <View style={styles.subTitle}>
          <Title text={text2} size="small" weight="light" color="gray"></Title>
        </View>
      )}
      {text3 && (
        <View style={styles.extraTitle}>
          <Title text={text3} size="mid" color="blue"></Title>
        </View>
      )}
      {text4 && (
        <View style={styles.extraTitle}>
          <Title text={text4} size="small" weight="bold" color="gray"></Title>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    alignContent: "flex-start",
    marginTop: 10,
    padding: 20,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
  },
  subTitle: {
    justifyContent: "center",
    alignItems: "center",
  },
  extraTitle: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
});
