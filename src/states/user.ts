import axios, { AxiosError, AxiosResponse } from "axios";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

type ServerError = { errorMessage: string };
const userToken: string = localStorage.getItem("userToken") || "";

const isLogginedState = atom({
  key: "isLogginedState",
  default: false,
});

const isLoadingState = atom({
  key: "isLoadingState",
  default: true,
});

const UserInfoState = atom({
  key: "userInfoState",
  default: null,
});

const FetchUserInfo = selector({
  key: "userInfo",
  get: async () => {
    try {
      const response: AxiosResponse = await axios.post(
        "/api/auth/authenticate"
      );
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          return serverError.response.data;
        }
        throw serverError;
      }
    }
  },
  set: ({ set }, newValue) => {
    set(UserInfoState, newValue);
  },
});

export { isLogginedState, UserInfoState, FetchUserInfo, isLoadingState };
