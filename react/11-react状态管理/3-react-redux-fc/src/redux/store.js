// store.js
import { configureStore } from '@reduxjs/toolkit'
import topSliceReducer from './slice/topSlice'

const store = configureStore({
  reducer: {
    counter: topSliceReducer,
    // 如果还有其他切片，继续添加
  },
  // 可选配置项，例如中间件、enhancers 或者启用 Redux DevTools 扩展
  // middleware: [...getDefaultMiddleware()],
  // devTools: process.env.NODE_ENV !== 'production',
})

export default store
