import { StyleSheet, View, Text } from "react-native";
import { palette } from "../lib/styles/colorPalette";
import { Ionicons } from "@expo/vector-icons";
import { CustomTextField } from "./TextField";
import { useRecoilState } from "recoil";
import { memberState } from "../atoms";
import React from "react";

export const UserCardWithMoney = (props) => {
  const { key, idx, name, bankName, cardNumber, amount } = props;
  const [members, setMembers] = useRecoilState(memberState);
  console.log({idx}, {amount});

  const handleAmountChange = (newAmount) => {
    console.log(newAmount);
    const updatedMembers = [...members];
    updatedMembers[idx] = {...updatedMembers[idx], amount: Number(newAmount)};

    setMembers(updatedMembers);
  };


  return (
    <View style={styles.container}>
        <View style={styles.row}>
            <View style={styles.leftRow}>
                <Ionicons
                    style={styles.profile}
                    name="person-circle-sharp"
                    size={30}
                    color="black"
                />
            <View style={styles.info}>
                <Text>{name}</Text>
                <Text>{bankName} {cardNumber}</Text>
            </View>
          </View>
            <View style={styles.amount}>
                <CustomTextField
                    onChangeText={(newAmount) => handleAmountChange(newAmount) }
                    value={amount}
                ></CustomTextField>
                <Text>원</Text>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: palette.blue,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    marginVertical: 3,
  },
  profile: {
    paddingHorizontal: 5,
  },
  info: {
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
  },
  leftRow:{
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  row:{
    flex:3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  amount:{
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    flex:1,
  }
});

export const MemorizedUserCardWithMoney = React.memo(UserCardWithMoney);
