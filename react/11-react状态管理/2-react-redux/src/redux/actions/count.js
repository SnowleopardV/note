import { INCREMENT, DECREMENT, SCROLL } from '../const'
export const createIncrement = (data) => ({
  type: INCREMENT,
  data,
})

export const createDecrement = (data) => ({
  type: DECREMENT,
  data,
})

export const createScroll = (data) => ({
  type: SCROLL,
  data,
})

// 异步action
export const createAsyncIncrement = () => ({
  type: 'ASYNC_INCREMENT',
})

export const createAsyncDecrement = () => ({})
