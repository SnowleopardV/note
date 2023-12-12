import { legacy_createStore as createStore } from 'redux'
// createStore 已经被弃用, 改用 legacy_createStore
import countReduce from './count_reduce'

export default createStore(countReduce)
