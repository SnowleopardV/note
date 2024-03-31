import { useEffect } from 'react'
// import { Canvas } from '@antv/g'
// import { Renderer } from '@antv/g-canvas'
// import DeviceBall from './DeviceBall'
// import Ring from './Ring'
import { nanoid } from 'nanoid'
import './App.css'
import fileImage from './file.jpg'
// import { nanoid } from 'nanoid'

// 从核心包中引入画布、Circle 等对象
// const { Canvas } = window.G

// 创建一个渲染器，这里使用 Canvas2D
// const canvasRenderer = new window.G.Canvas2D.Renderer()
// import DeviceBall from './DeviceBall'

function App() {
  const arr = new Array(10000).fill(1)
  arr.forEach((item, index) => (arr[index] = index + 1))

  console.time('init')
  console.log(Date.now())

  useEffect(() => {
    console.timeEnd('init')
  })

  return (
    <div className='App'>
      {/* <div id='canvasWrap'></div> */}
      <div className='container'>
        {arr.map((_, index) => {
          // console.log(28, arr, index)
          return (
            <div className='item' key={nanoid()}>
              <img src={fileImage} alt='' className='fileImage' />
              <span>文件</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
