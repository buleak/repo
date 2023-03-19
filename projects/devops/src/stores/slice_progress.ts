import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  loading: boolean;
  percentage: number;
}

const initialState: InitialState = {
  loading: false,
  percentage: 0,
};

export const progress = createSlice({
  name: "progress",
  initialState,
  reducers: {
    start(state) {
      state.loading = true;
    },
    stop(state) {
      state.loading = false;
    },
    makeProgress(state, action: PayloadAction<number>) {
      state.percentage += action.payload;
    },
  },
});

export const { start, stop, makeProgress } = progress.actions;
export const progressSR = progress.reducer