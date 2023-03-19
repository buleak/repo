import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/stores";

export type TodoID = string;
export type Status = "todo" | "doing" | "done";
export type FilterStatus = Status | "other";

export interface Todo {
  id: TodoID;
  content: string;
  creator: string;
  status: Status;
  creationDate: string;
  updatedBy?: string;
  updatedDate?: string;
}

const initialState: Todo[] = [];

export const slice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    addTodoItem: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    removeTodoItem: (state, action: PayloadAction<TodoID>) => {
      const index = state.findIndex(item => item.id === action.payload);
      index > -1 && state.splice(index, 1);
    },
    editTodoItem: (state, action: PayloadAction<Todo>) => {
      const { payload } = action;
      let index = state.findIndex(item => item.id === payload.id);
      index > -1 && state.splice(index, 1, payload);
    },
  },
  // 额外的reducer, 可以响应在切片外面定义的reducer
  extraReducers(builder) {
    builder
      .addCase(fetchPokemon.pending, (state, action) => {
        console.log("11111111111 ==>", 11111111111);
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        console.log("action.payload ==>", action.payload);
      });
  },
});

// 生产action对象的函数. 调用: dispatch(action(payload))
export const { addTodoItem, removeTodoItem, editTodoItem } = slice.actions;
// 切片 reducer
export const todoListSliceReducer = slice.reducer;

// 选择器, 作为 useSelector( selectAllTodo )的参数使用, 用于从 state中读取数据
export const selectAllTodo = (state: RootState) => state.todolist;
export const selectFirstTodo = (state: RootState) => state.todolist[0];

// thunk 异步函数. 调用: dispatch(fetchPokemon(payload))
export const fetchPokemon = createAsyncThunk(
  "pom/fetchPokemon",
  async (payload: { name: string }) => {
    console.log("payload ==>", payload);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${payload.name}`
      );
      if (!res.ok) throw "Error";
      const data = await res.json();
      await new Promise(resolve => {
        setTimeout(() => {
          resolve(0);
        }, 3000);
      });
      console.log("data ==>", data);
      return data;
    } catch (err) {
      console.log("err ==>", err);
    }
  }
);
