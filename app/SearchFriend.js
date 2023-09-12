import { StyleSheet } from "react-native";
import { Background } from "../components/Background";
// import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/Button.js";
import { TitleContainer } from "../components/TitleContainer";
import { SearchBar } from "../components/SearchBar";

export const SearchFriend = () => {
  return (
    <Background>
      <TitleContainer text1="검색으로 친구를 찾을 수 있어요" />
      <SearchBar />
      <Button title="검색" type="big"></Button>
    </Background>
  );
};

const styles = StyleSheet.create({});
