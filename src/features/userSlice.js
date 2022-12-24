import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAuth } from "../actions/userAuth";
import { userLogin } from "../actions/userLogin";
import { userRegister } from "../actions/userRegister";
import { atom } from "recoil";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

export const userSlice = createSlice({
  name: "User",
  initialState: {
    loading: false,
    user: null,
    userToken,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.userToken = payload.token;
      state.success = payload.success;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [userAuth.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userAuth.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = payload.success;
      state.user = payload.user;
    },
    [userAuth.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [userRegister.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.user = null;
    },
    [userRegister.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = payload.success;
      state.user = null;
    },
    [userRegister.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.user = null;
    },
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
