import { atom } from "recoil";

export const memberState = atom({
  key: "memberState",
  default: [],
});

export const paymentMemberState = atom({
  key: "paymentMemberState",
  default: [],
});

export const friendState = atom({
  key: "friendState",
  default: [],
});

export const todoState = atom({
  key: "todoState",
  default: [],
});

// More atoms related to todo
export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});
