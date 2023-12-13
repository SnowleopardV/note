import { INCREMENT, DECREMENT } from '../const'
const initState = 0
export default (preState = initState, action) => {
  const { type, data } = action

  switch (type) {
    case INCREMENT: {
      return preState + Number(data)
    }
    case DECREMENT: {
      return preState - Number(data)
    }
    default: {
      return preState
    }
  }
}

// export default countReducer

// reducer 是一个纯函数
// 纯函数
// 1. 同样的入参, 返回值是同样的结果
// 2.

// reducer 如果没有产生一个新的值, 则不会触发更新
