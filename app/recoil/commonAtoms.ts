import { atom } from "recoil";

export const headerShowState = atom({
  key: "headerShowState",
  default: true,
});

export type alertStateType = {
  open: boolean;
  title: string;
  desc?: string;
  onPress: () => Promise<void>;
  onClosed?: () => Promise<void>;
  defaultText?: string;
  cancelText?: string;
};

export const alertState = atom<alertStateType>({
  key: "alertState",
  default: {
    open: false,
    title: "",
    desc: "",
    onPress: async () => {},
    onClosed: async () => {},
    defaultText: "확인",
    cancelText: "취소",
  },
});
