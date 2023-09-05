import { StyleSheet, View, Text, Pressable } from "react-native";
import { palette } from "../lib/styles/colorPalette";

export const Home = () => {
  return (
    <View style={styles1.container}>
      <View style={[styles1.box, styles1.box1]}>
        <Text style={styles1.smalltext}>
          올해 더치페이로 받은 세액공제 금액
        </Text>
        <Text style={styles1.money}>0원</Text>
      </View>
      <View style={[styles1.box, styles1.box2]}>
        <Text style={styles1.subtitle}>
          언제 어디서든 정산 없이 QR 하나로 더치페이하고 소득공제 받아보세요!
        </Text>
        <View style={styles1.texts}>
          <Text>1. 같이 결제할 멤버를 초대한다.</Text>
          <Text>2. QR을 생성한다.</Text>
          <Text>3. 멤버들이 모두 수락하면 결제한다.</Text>
        </View>
        <Pressable style={styles1.btn}>
          <Text style={styles1.btntext}>더치페이 하러가기</Text>
        </Pressable>
      </View>
      <View style={[styles1.box, styles1.box3]}>
        <View style={styles1.top}>
          <Text style={styles1.smalltitle}>대표 카드</Text>
          <Pressable style={styles1.smallbtn}>
            <Text style={styles1.smallbtntext}>등록</Text>
          </Pressable>
        </View>
        <Text style={styles1.emptytext}>대표 카드를 등록해주세요</Text>
      </View>
    </View>
  );
};

const styles1 = StyleSheet.create({
  container: {
    marginTop: 120,
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
  subtitle: {
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "Arial",
  },
  texts: {
    flex: 1,
    padding: 20,
    justifyContent: "space-evenly",
  },
  btn: {
    backgroundColor: palette.blue,
    borderRadius: 18,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  btntext: {
    color: palette.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  smalltitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  smallbtn: {
    backgroundColor: palette.blue,
    borderRadius: 14,
    padding: 10,
  },
  smallbtntext: {
    color: palette.white,
    fontSize: 12,
  },
  emptytext: {
    fontSize: 16,
    color: "lightgray",
    textAlign: "center",
    textAlignVertical: "center",
    paddingTop: 40,
  },
});
