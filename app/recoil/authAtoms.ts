import { atom } from "recoil";

type userStateType = {
  _id: null | string;
  userId: null | string;
  nickname: null | string;
  userName: null | string;
  birthYear: null | string;
  phoneNumber: null | string;
  profileImage: null | string;
  role: null | string;
  state: null | string;
  deletedAt: null | string;
  createdAt: null | string;
  updatedAt: null | string;
};

type tokenType = null | string;

export const userState = atom<userStateType>({
  key: "userState",
  default: {
    _id: null,
    userId: null,
    nickname: null,
    userName: null,
    birthYear: null,
    phoneNumber: null,
    profileImage: null,
    role: null,
    state: null,
    deletedAt: null,
    createdAt: null,
    updatedAt: null,
  },
});

export const accessTokenState = atom<tokenType>({
  key: "accessTokenState",
  default: null,
});

export const idFoundState = atom({
  key: "idFoundState",
  default: "",
});

export const oneTimeTokenStat = atom({
  key: "oneTimeTokenState",
  default: "",
});
