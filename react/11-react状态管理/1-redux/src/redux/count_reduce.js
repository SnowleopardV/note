import { INCREMENT, DECREMENT } from './const'

const initState = 0
const reducer = (preState = initState, action) => {
  // const reducer = (preState, action) => {
  // reducer初始化的时候是undefined, 可以指定一个默认值, 这里指定了默认值0
  const { type, data } = action

  console.log(5, preState, type, data)

  switch (type) {
    case INCREMENT:
      return preState + Number(data)
    case DECREMENT:
      return preState - Number(data)
    default:
      return preState
  }
}

export default reducer
