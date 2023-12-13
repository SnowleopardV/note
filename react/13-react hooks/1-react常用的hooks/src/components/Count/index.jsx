import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
// 注意: 这里的{}不是解构赋值, 是按需导入
import styles from './index.module.css'

export default function Count () {

  const [count, setCount] = useState(0)
  // React 底层做了处理, 会把之前count的值给缓存住
  // 虽然调用setCount触发了函数组件的再次执行
  // 执行到const [count, setCount] = useState(0) 不会覆盖之前的状态


  const add = () => setCount(count + 1)

  const add2 = () => setCount(() => count + 1)
  // setCount 还可以传入一个函数, 函数有返回值

  console.log(19, ReactDOM.unmountComponentAtNode, document.getElementById('root'))

  const unmount = ReactDOM.unmountComponentAtNode(document.getElementById('root'))

  useEffect(() => {
    console.log(19)
    return () => {
      console.log(24, '组件卸载')
    }
  }, [])

  useEffect(() => {
    console.log('初始化和count状态更新')
  }, [count])

  return <div className={styles.helloTitle}>
    <h3>当前的数值为{count}</h3>
    <button onClick={add}>点击+1</button>
    <button onClick={add2}>点击+1 (setCount传入一个函数)</button>
    <button onClick={unmount}>卸载组件</button>
  </div>
}
