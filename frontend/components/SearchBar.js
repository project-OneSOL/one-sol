import React from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { palette } from "../lib/styles/colorPalette";

export const SearchBar = ({ text, setSearchVal, searchVal }) => {
  return (
    <Searchbar
      placeholder={text}
      onChangeText={(query) => setSearchVal(query)}
      value={searchVal}
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
