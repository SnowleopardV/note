// import React, { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <StrictMode>
  // 如果用StrictMode包裹组件, useEffect(() => {}, []) 会执行两次
  <App />
  // </StrictMode>
)
