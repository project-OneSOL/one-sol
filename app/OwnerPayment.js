import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Background } from "../components/Background";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { UserList } from "../components/UserList";

export const OwnerPayment = ({ navigation }) => {
  const [cost, setCost] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);
  const handleInputChange = (cost) => {
    cost = cost.replaceAll("원", "");
    setCost(cost.replaceAll(",", ""));
    if (cost === "") setDisableBtn(true);
    else setDisableBtn(false);
  };
  const addComma = () => {
    if (cost !== "")
      return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
    else return "";
  };

  return (
    <Background>
      <View style={styles.titleContainer}>
        <Title text="투썸플레스 역삼역점에서"></Title>
        <View style={styles.costContainer}>
          <TextInput
            editable
            inputMode="numeric"
            //   maxLength={}
            placeholder="결제할 금액"
            style={styles.input}
            onChangeText={handleInputChange}
            value={addComma(cost)}
          ></TextInput>
          {/* <Text style={styles.input}>원</Text> */}
        </View>
      </View>
      <View>
        <UserList />
      </View>
      <View>
        <Button
          title="결제 요청하기"
          disabled={disableBtn}
          onPress={() =>
            navigation.push("GenerateQR", { screen: "GenerateQR" })
          }
        ></Button>
        <Button title="결제 취소하기" color="gray"></Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  costContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 34,
    paddingVertical: 16,
    paddingRight: 5,
  },
});
