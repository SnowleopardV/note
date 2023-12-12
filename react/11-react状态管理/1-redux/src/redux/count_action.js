import { INCREMENT, DECREMENT } from './const'
import store from './store'

export const createIncrement = (data) =>
  store.dispatch({ type: INCREMENT, data })

export const createDecrement = (data) =>
  store.dispatch({ type: DECREMENT, data })
