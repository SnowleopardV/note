import React, { useState, useEffect, useRef, Fragment } from 'react'
// import React, { Component, createRef } from 'react'
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

  const inputRef = useRef()

  const show = () => alert(inputRef.current.value)

  useEffect(() => {
    console.log(19, '组件加载')
    // eslint-disable-next-line
    const timer = setInterval(() => {
      console.log(26, count)
      setCount(count => count + 1)
    }, 1000)
    // debugger;


    return () => {
      console.log(24, '组件卸载')
      // debugger;
      clearInterval(timer)
    }
    // eslint-disable-next-line
  }, [])

  // useEffect(() => {
  // console.log('初始化和count状态更新')
  // }, [count])

  return (
    <Fragment>
      <Fragment>
        <>
          <div className={styles.helloTitle}>
            <input ref={inputRef} type="text" />
            <h3>当前的数值为{count}</h3>
            <button onClick={add}>点击+1</button>
            <button onClick={add2}>点击+1 (setCount传入一个函数)</button>
            <button onClick={show}>输入框内容</button>
          </div>
        </>
      </Fragment>
    </Fragment>
  )
}


// export default class index extends Component {
//   state = { count: 0 }

//   inputRef = createRef()

//   show = () => {
//     alert(this.inputRef.current.value)
//   }

//   componentDidMount () {
//     this.timer = setInterval(() => {
//       console.log(54)
//       this.setState({ count: this.state.count + 1 })
//     }, 1000)
//   }

//   render () {
//     return (
//       <div className={styles.helloTitle}>
//         <input ref={this.inputRef} type="text" />
//         <h3>当前的数值为{this.state.count}</h3>
//         <button onClick={this.add}>点击+1</button>
//         <button onClick={this.show}>输入框内容</button>
//       </div>
//     )
//   }

//   componentWillUnmount () {
//     clearInterval(this.timer)
//   }
// }
