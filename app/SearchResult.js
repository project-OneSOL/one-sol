import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList} from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { Title } from "../components/Title";
import { UserCard } from "../components/UserCard";
import { SearchBar } from "../components/SearchBar";


export const SearchResult = () => {

  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const initialData = [
    { name: "이동현", phone: "010-1234-5678" },
    { name: "박기련", phone: "010-1234-5678" },
    { name: "최민수", phone: "010-1234-5678" },
    { name: "김현정", phone: "010-1234-5678" },
  ];

  useEffect(() => {
    setSearchResult(initialData.filter((item) =>
      item.name.toLowerCase().includes(searchVal.toLowerCase())
    ));
  }, [searchVal]);
 
  const renderItem = ({ item }) => {
    if (!searchVal || searchResult.length === 0) {
      return null;
    }
    
    return ( 
      <UserCard name={item.name} phone={item.phone}>
        <Button title="팔로우" type="small"></Button>
      </UserCard>
    );
  };

  return (
    <Background>
      <TitleContainer
          text1="조회 결과"
        />
      <SearchBar
        text="이름으로 검색"
        setSearchVal={setSearchVal}
        searchVal={searchVal}
      />
      {searchResult.length === 0 ? (
        <TitleContainer
          text4="존재하지 않는 회원입니다"
        ></TitleContainer>
      ) : (
        <TitleContainer
          text4="찾으시는 분의 성함을 확인해주세요"
        ></TitleContainer>
      )}
      <View style={styles.friends}>
        {searchVal.length === 0 ? (
          <Title text="0건의 결과가 있습니다" size="small" weight="light" color="gray"></Title>
        ) : (
          <Title text={`총 ${searchResult.length}건의 결과가 있습니다`} size="small" weight="light" color="gray"></Title>
        )}
        <View style={styles.top}>
          <FlatList
            data={searchResult}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
          <Button title="친구 목록 보러가기" type="big"></Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});
