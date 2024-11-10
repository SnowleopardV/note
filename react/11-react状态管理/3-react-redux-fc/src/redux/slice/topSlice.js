import { createSlice } from '@reduxjs/toolkit'
// 定义初始状态
const initialState = {
  counter: 0,
}

// 创建一个名为 counter 的 slice
const counterSlice = createSlice({
  name: 'counter', // slice 名称，用于调试信息和生成 action.type
  initialState, // 初始状态对象
  reducers: {
    // 定义 reducer 函数和对应的 action.type
    increment: (state, data) => {
      // 纯函数：根据当前状态生成新的状态
      console.log(15, data)
      state.counter += 1
    },
    decrement: (state) => {
      state.counter -= 1
    },
  },
})

// 导出 action creators 和 reducer
export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
