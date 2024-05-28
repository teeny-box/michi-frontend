import { atom } from "recoil";

export type changeProfileImageType = string | null;

export const changeProfileImageState = atom<changeProfileImageType>({
  key: "changeProfileImageState",
  default: null,
});
