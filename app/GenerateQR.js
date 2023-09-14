import { Background } from "../components/Background";
import { TitleContainer } from "../components/TitleContainer";
import { Button } from "../components/Button";
import { View } from "react-native";

export const GenerateQR = () => {
  return (
    <Background>
      <TitleContainer
        text1="QR이 생성되었습니다!"
        text2="생성된 QR을 결제시 보여주세요."
      ></TitleContainer>
      <View></View>
      <Button title="새로고침" color="gray"></Button>
    </Background>
  );
};
