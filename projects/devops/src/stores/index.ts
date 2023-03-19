/**
 * 创建Redux存储
 */
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
// 切片reducer
import { counterSliceReducer } from "@/features/counter/slice";
import { todoListSliceReducer } from "@/features/todolist/slice";
import { commonSR } from "./slice_common";
import { progressSR } from "./slice_progress";
import { loginApi } from "@/features/login/api";
// RTK Query reducer
import { pokemonApi } from "@/features/pokemon/api";

export const store = configureStore({
  reducer: {
    commonSR,
    progressSR,
    [loginApi.reducerPath]: loginApi.reducer,
    counter: counterSliceReducer,
    todolist: todoListSliceReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // RTK Query中间件
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 封装标准Redux hooks, 导出预类型hooks 方便调用时不用重复写state类型
export const useDispatch: () => AppDispatch = useAppDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
