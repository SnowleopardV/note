import { ADD_PERSON } from '../const'
const initState = []
export default (preState = initState, action) => {
  const { type, data } = action

  switch (type) {
    case ADD_PERSON: {
      return [data, ...preState]
    }
    default:
      return preState
  }
}

// reducer 如果没有产生一个新的值, 则不会触发更新
// 如7行改写成如下, 则不会触发更新, 因为都指向同一个地址
// preState.unshift(data)
// return preState
