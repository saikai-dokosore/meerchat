import { atom } from "recoil";

export const textListState = atom<string[]>({
  key: "textList",
  default: [],
});
