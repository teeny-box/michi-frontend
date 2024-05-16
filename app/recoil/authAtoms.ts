import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {},
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const idFoundState = atom({
  key: "idFoundState",
  default: "",
});
