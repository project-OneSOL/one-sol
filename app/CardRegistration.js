import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { BottomSheet } from "react-native-btr";
import { DoubleButton } from "../components/DoubleButton";

export const CardRegistration = ({
  visible,
  toggleBottomNavigationView,
  navigation,
}) => {
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
          <Title text="대표 카드" size="mid" />
        </View>
        <View style={styles.cardbox}>
          <Title
            text="대표 카드를 등록해주세요"
            size="small"
            weight="light"
            color="gray"
          />
        </View>
        <View style={styles.addButton}>
          <Button
            title="카드 추가"
            type="mid"
            onPress={() => {
              toggleBottomNavigationView();
              navigation.push("CardSelection", { screen: "CardSelection" });
            }}
          ></Button>
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
