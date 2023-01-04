import { atom } from "recoil";
import { localStorageEffect } from "./effect/localStorage";

export const userState = atom({
  key: "user_state",
  default: {},
  effects: [localStorageEffect("user")],
});
