import React from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from 'react-native-paper';

import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/Button.js";
import { Title } from "../components/Title.js";

export const SearchFriend = () => {

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles1.container}>
      <Title
        text="검색으로 친구를 찾을 수 있어요"
        size="big"
      ></Title>
      <Searchbar
        placeholder="이메일 아이디로 검색"
        onChangeText={onChangeSearch}
        value={searchQuery}
        searchIcon={{ size: 24 }}
        color="lightgray"
      />
      <Button title="검색" type="big"></Button>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: palette.bg,
    borderTopLeftRadius: 40,
  },
  box: {
    borderRadius: 30,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: palette.shadow,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {
          height: 0,
          width: 2,
        },
      },
    }),
  },
  box1: {
    flex: 0.09,
    justifyContent: "space-evenly",
    backgroundColor: palette.blue,
  },
  box2: {
    flex: 0.46,
    justifyContent: "space-evenly",
    backgroundColor: palette.white,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  box3: {
    flex: 0.3,
    backgroundColor: palette.white,
    paddingHorizontal: 30,
  },
  smalltext: {
    color: palette.white,
    fontSize: 14,
  },
  money: {
    color: palette.white,
    fontSize: 24,
    fontWeight: "600",
  },
  texts: {
    flex: 1,
    padding: 20,
    justifyContent: "space-evenly",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  emptytext: {
    fontSize: 16,
    color: "lightgray",
    textAlign: "center",
    textAlignVertical: "center",
    paddingTop: 40,
  },
});