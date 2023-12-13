import { configureStore } from '@reduxjs/toolkit'
// import { combineReducers } from '@reduxjs/toolkit'
import countReducer from './reducers/count'
import personReducer from './reducers/person'

export default configureStore({
  // reducer: combineReducers(countReducer, personReducer),
  reducer: {
    count: countReducer,
    persons: personReducer,
  },
})
