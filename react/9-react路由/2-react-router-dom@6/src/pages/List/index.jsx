import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function List () {
  const [count, setCount] = useState(0)
  const add = () => setCount(count + 1)

  return (
    <div>
      <h3>List组件</h3>
      <div>count值为{count}</div>
      {
        // Navigate 只要渲染, 就会切换视图
        count === 5 ? <Navigate to="/home" /> : <button onClick={add}>点击按钮+1, 当count值为5时, 页面跳转到/home</button>
      }
    </div>
  )
}
