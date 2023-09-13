import { StyleSheet, View, ScrollView } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { TitleContainer } from "../components/TitleContainer";
import { Title } from "../components/Title";
import { SearchBar } from "../components/SearchBar";
import { Chip } from "react-native-paper";
import { UserCard } from "../components/UserCard";

export const Payments = () => {
  const users = ["이동현", "박기련", "최민수", "김현정"];
  return (
    <Background>
      <View style={styles.container}>
        <TitleContainer
          text1="누구와 함께 계산 하시나요?"
          text2="함께 결제할 인원을 선택해주세요"
          text3="0명"
        ></TitleContainer>
        <View style={styles.searchContainer}>
          <SearchBar text="이름 또는 이메일 검색" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chips}
          >
            {users.map((user) => (
              <Chip
                style={styles.chip}
                onPress={() => console.log("Pressed", user)}
                onClose
              >
                {user}
              </Chip>
            ))}
          </ScrollView>
        </View>
        <View style={styles.friends}>
          <View style={styles.top}>
            <View style={styles.switchTitle}>
              <View style={styles.title}>
                <Title text="최근" size="mid" weight="semibold"></Title>
              </View>
              <View style={styles.title}>
                <Title text="친구 목록" size="mid" weight="semibold"></Title>
              </View>
            </View>
            <Button
              styles={styles.addBtn}
              title="+ 친구 추가"
              type="mid"
            ></Button>
          </View>
          <ScrollView showsVerticalScrollIndicator="false">
            <View style={styles.friendsList}>
              {users.map((user) => (
                <UserCard
                  style={styles.friend}
                  name={user}
                  phone="010-1234-5678"
                ></UserCard>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.btnContainer}>
          <Button title="다음" type="big"></Button>
        </View>
      </View>
    </Background>
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
    // justifyContent: "space-evenly",
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
