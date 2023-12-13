import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// 更狠的方法, 不需要在每个组件中进行监听
store.subscribe(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
