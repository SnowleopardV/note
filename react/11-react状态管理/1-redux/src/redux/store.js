import { createStore } from 'redux'
import countReduce from './count_reduce'

export default createStore(countReduce)
