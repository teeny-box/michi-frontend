import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {},
});

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const idFoundState = atom({
  key: "idFoundState",
  default: "",
});
