import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { UserList, UserCard } from "../components/UserCard";

export const SearchResult = ({ searchResult }) => {
  return (
    <View style={styles.container}>
      <Title
        style={styles.title}
        text={`총 ${searchResult.length}건의 결과가 있습니다`}
        size="small"
        weight="light"
        color="gray"
      ></Title>
      {searchResult.length ? (
        <View style={styles.top}>
          <UserList data={searchResult} />
        </View>
      ) : (
        <TitleContainer text4="존재하지 않는 회원입니다"></TitleContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  // title: {
  // },
  top: {
    marginTop: 15,
  },
});
