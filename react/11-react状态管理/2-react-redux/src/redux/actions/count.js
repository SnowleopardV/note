import { INCREMENT, DECREMENT } from '../const'
export const createIncrement = (data) => ({
  type: INCREMENT,
  data,
})

export const createDecrement = (data) => ({
  type: DECREMENT,
  data,
})
