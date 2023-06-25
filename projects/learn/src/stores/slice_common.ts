import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  user_name: string;
  real_name: string;
}

export interface LoginPayload {
  user_name: string;
  pass_word: string;
}

export interface InitialState {
  login: boolean;
  userInfo?: User;
  access_token?: string;
  refresh_token?: string;
  rules?: string[];
  permissions?: string[];
  theme: "light" | "dark";
}

const initialState: InitialState = {
  login: false,
  theme: "light",
};

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    logOut(state) {
      state = initialState;
    },
    logIn(state, payload: PayloadAction<LoginPayload>) {},
  },
});

export const { logOut } = common.actions;
export const commonSR = common.reducer;
