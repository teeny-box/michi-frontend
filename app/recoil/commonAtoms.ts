import { atom } from "recoil";

export const headerShowState = atom({
  key: "headerShowState",
  default: true,
});

export type alertStateType = {
  open: boolean;
  title: string;
  desc?: string;
  onPress?: (() => Promise<void>) | (() => void);
  onClosed?: (() => Promise<void>) | (() => void);
  defaultText?: string;
  cancelText?: string;
};

export const alertState = atom<alertStateType>({
  key: "alertState",
  default: {
    open: false,
    title: "",
    desc: "",
    onPress: () => {},
    onClosed: () => {},
    defaultText: "",
    cancelText: "",
  },
});

export const loadingState = atom({
  key: "loadingState",
  default: false,
});
