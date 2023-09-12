import React from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { palette } from "../lib/styles/colorPalette";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="이메일 아이디로 검색"
      onChangeText={onChangeSearch}
      value={searchQuery}
      searchIcon={{ size: 24 }}
      style={styles.searchbar}
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    borderRadius: 10,
    backgroundColor: palette.lightgray,
  },
});
