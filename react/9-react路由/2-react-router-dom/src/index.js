import React from 'react'
import ReactDOM from 'react-dom/client'
// hash模式
// import { HashRouter } from 'react-router-dom'
// history 模式
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* history模式  */}
    <BrowserRouter>
      <App />
    </BrowserRouter>

    {/* hash模式 */}
    {/* <HashRouter>
      <App />
    </HashRouter> */}
  </React.StrictMode>
)
