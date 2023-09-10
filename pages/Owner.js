import { StyleSheet, View, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { Header } from "../components/Header";

export const Owner = () => {
  return (
    <View style={styles1.container}>
      <View style={[styles1.box, styles1.box1]}>
        <Text style={styles1.bigtext}>투플레이스 역삼역점</Text>
      </View>
      <View style={[styles1.box, styles1.box2]}>
        <Title
          text="QR 스캔 하나로 결제 해보세요!"
          size="small"
          
        ></Title>
        <View style={styles1.texts}>
          <Text>1. QR을 스캔한다.</Text>
          <Text>2. 금액을 입력한다.</Text>
          <Text>3. 결제 요청하면 자동은 결제된다.</Text>
        </View>
        <Button title="QR 스캔 하러가기" type="big"></Button>
      </View>
      <View style={[styles1.box, styles1.box3]}>
        <View style={styles1.top}>
          <Title text="대표 카드" size="small"></Title>
          <Button title="등록" type="small"></Button>
        </View>
        <Text style={styles1.emptytext}>대표 카드를 등록해주세요</Text>
      </View>
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
  bigtext: {
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
    