import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { UserCard } from "../components/UserCard";

export const SearchResult = ({ searchVal, searchResult }) => {
  const renderItem = ({ item }) => {
    return (
      <UserCard name={item.name} phone={item.phone}>
        <Button title="친구 추가" type="small"></Button>
      </UserCard>
    );
  };

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
          <FlatList
            data={searchResult}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
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
