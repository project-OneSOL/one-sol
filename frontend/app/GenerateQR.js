import { Background } from "../components/Background";
import { TitleContainer } from "../components/TitleContainer";
import { Button } from "../components/Button";
import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export const GenerateQR = () => {
  const paymentInfo = {
    storeName: "투썸플레이스 역삼역점",
    totalPrice: "40000",
  };
  return (
    <Background>
      <TitleContainer
        text1="QR이 생성되었습니다!"
        text2="생성된 QR을 결제시 보여주세요."
      ></TitleContainer>
      <View style={styles.qrContainer}>
        <QRCode
          value={JSON.stringify({
            storeName: paymentInfo.storeName,
            totalPrice: paymentInfo.totalPrice,
          })}
          size={150}
        ></QRCode>
      </View>
      <Button title="새로고침" color="gray"></Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  qrContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
  },
});
