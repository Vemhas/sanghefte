import { atom } from "recoil";

/*
Global storage for å vite hvilket sanghefte man er inne på
 */
export const sanghefteState = atom({
  key: "sanghefteState",
  default: "",
});

export const songIDState = atom({
  key: "songIDState",
  default: "",
});
