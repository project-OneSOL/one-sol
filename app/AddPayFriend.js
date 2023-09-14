import { StyleSheet, View } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Title } from "../components/Title";
import { CustomTextField } from "../components/TextField";

import { BottomSheet } from "react-native-btr";
import { DoubleButton } from "../components/DoubleButton";

export const AddPayFriend = ({
  visible,
  toggleBottomNavigationView,
  navigation,
}) => {
  return (
    <BottomSheet visible={visible} onBackdropPress={toggleBottomNavigationView}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Title text="친구 추가" size="mid" />
        </View>
        <View style={styles.textField}>
          <CustomTextField placeholder="이름" maxLength={10}></CustomTextField>
        </View>
        <View style={styles.textField}>
          <CustomTextField
            placeholder="핸드폰 번호"
            maxLength={20}
          ></CustomTextField>
        </View>
        <DoubleButton
          press1={toggleBottomNavigationView}
          press2={toggleBottomNavigationView}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flex: 0.4,
    backgroundColor: palette.white,
    paddingHorizontal: 20,
  },
  title: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  textField: {
    padding: 10,
  },
  cardbox: {
    borderRadius: 20,
    borderColor: palette.lightblue,
    borderWidth: 2,
    paddingVertical: 30,
    alignItems: "center",
  },
  addButton: {
    paddingTop: 7,
  },
});
