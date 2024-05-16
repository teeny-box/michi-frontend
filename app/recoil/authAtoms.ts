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

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const idFoundState = atom({
  key: "idFoundState",
  default: "",
});
