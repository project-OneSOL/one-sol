import { StyleSheet, View, ScrollView } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { TextField } from "../components/TextField";
import { Title } from "../components/Title";
import { SearchBar } from "../components/SearchBar";
import { Chip } from "react-native-paper";
import { UserCard } from "../components/UserCard";
import { useNavigation } from "@react-navigation/native";

import { BottomSheet } from "react-native-btr";
import { DoubleButton } from "../components/DoubleButton";

export const CreateQR = (props) => {

    const navigation = useNavigation();
    const { visible, toggleBottomNavigationView } = props;
    return (
        <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
        >
        <View style={styles.container}>
            <View style={styles.title}>
            <Title text="친구 추가" size="mid" />
            </View>
            <View style={styles.TextField}>
            <Title text="이름" weight="light" color="gray" />
          </View>
          <View style={styles.TextField}>
            <Title text="핸드폰 번호" weight="light" color="gray" />
            </View>
          <DoubleButton />
        </View>
        </BottomSheet>
    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  searchContainer: {
    // paddingVertical: 10,
    // paddingHorizontal: 10,
  },
  chips: {
    // marginHorizontal: 10,
    marginVertical: 10,
  },
  chip: {
    margin: 3,
    backgroundColor: "transparent",
    borderColor: palette.lightblue,
    borderWidth: 1,
  },
  friends: {
    flex: 1,
    paddingVertical: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  switchTitle: {
    flex: 0.9,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginRight: 10,
  },
  addBtn: {
    alignSelf: "flex-end",
  },
  friendsList: {
    paddingHorizontal: 6,
    flexDirection: "column",
  },
  friend: {},
  btnContainer: {},
});
