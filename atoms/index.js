import { atom } from "recoil";

export const memberState = atom({
    key: "memberState",
    default: []
})

export const todoState = atom({
  key: "todoState",
  default: [],
});

// More atoms related to todo