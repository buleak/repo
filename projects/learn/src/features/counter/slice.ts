/**
 * 创建 Redux状态切片
 *
 * 需要: 字符串名称标识切片, 初始状态值, reducer函数来定义如何更新状态
 *
 * 导出: actions, reducer函数
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// 定义初始状态值类型, 以便createSlice正确推断出每种情况下的reducer的state类型
export interface CounterState {
  value: number;
}

// 初始状态值
const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // 因为使用了 ***immer库***, toolkit允许我们在reducer中编写"可变"逻辑, 但实际上状态还是"不可变的", 只会生成新的"不可变"状态;
    /**
     * Reducer规则:
     *  1. 仅使用 state和action参数 计算新的状态值
     *  2. 禁止直接修改state, 只能做"不可变更新(immutable updates)"
     *  3. 禁止任何异步逻辑, 依赖随机值, 或导致其他"副作用"的代码
     */
    increment: state => {
      // 实际上生成了新的value代替旧的, 而不是改变旧的value的值
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// 导出actions函数, 通过dispatch(action()) 执行对应的reducer
// action(payload) ==> { type: '{counterSlice.name}/action_fn_name', payload }
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 导出reducer, 传给configureState
export const counterSliceReducer = counterSlice.reducer;
