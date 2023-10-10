import { atom } from "recoil";

export const paymentMemberState = atom({
  key: "paymentMemberState",
  default: [],
});

// 최근 함께 결제한 멤버들
export const recentState = atom({
  key: "recentState",
  default: [],
});

// 친구 목록
export const friendState = atom({
  key: "friendState",
  default: [],
});

// 아직 사용 x
export const todoState = atom({
  key: "todoState",
  default: [],
});

// More atoms related to todo
export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});
