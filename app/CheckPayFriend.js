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
import { CustomTextField } from "../components/TextField";

import { BottomSheet } from "react-native-btr";
import { DoubleButton } from "../components/DoubleButton";

export const CheckPayFriend = (props) => {

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
              <Title text="함께 결제할 친구" size="mid" />
            </View>
            <View>
          <UserList />
          </View>
          <DoubleButton />
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
