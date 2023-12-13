import { legacy_createStore as createStore } from 'redux'
// createStore 已经被弃用, 改用 legacy_createStore
import countReduce from './count_reduce'
// 项目中引入redux-devtools-extensionx
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(countReduce, composeWithDevTools())
