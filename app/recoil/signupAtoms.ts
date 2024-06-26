import { atom } from "recoil";

export const idState = atom({
  key: "idState",
  default: "",
});

export const passwordState = atom({
  key: "passwordState",
  default: "",
});

export const nicknameState = atom({
  key: "nicknameState",
  default: "",
});

export const certificationState = atom<"waiting" | "running" | "success" | "fail">({
  key: "certificationState",
  default: "waiting",
});

export const userNameState = atom({
  key: "userNameState",
  default: "",
});

export const phoneNumberState = atom({
  key: "phoneNumberState",
  default: "",
});

export const birthYearState = atom({
  key: "birthYearState",
  default: "",
});
