import { useEffect, useMemo } from 'react'
// import { Canvas } from '@antv/g'
// import { Renderer } from '@antv/g-canvas'
import DeviceBall from './DeviceBall'
import Ring from './Ring'
import './App.css'

// 从核心包中引入画布、Circle 等对象
const { Canvas } = window.G

// 创建一个渲染器，这里使用 Canvas2D
const canvasRenderer = new window.G.Canvas2D.Renderer()
// import DeviceBall from './DeviceBall'

function App() {
  // const globalData = useMemo(
  //   () => ({
  //     animateSilenceList: [],
  //     animateRunningList: [],
  //     animateFinishedList: [],
  //   }),
  //   []
  // )

  // const ifAnimationsMutexeMap = useMemo(
  //   () => ({
  //     RING_DEVICEBALL: false,
  //     DEVICEBALL_DEVICEBALL: true,
  //   }),
  //   []
  // )
  // // const globalData = {}
  // const deviceBallList = useMemo(
  //   () => [{ name: 1 }, { name: 2 }, { name: 3 }],
  //   []
  // )

  // useEffect(() => {
  //   const canvas = new Canvas({
  //     container: 'canvasWrap',
  //     width: 900,
  //     height: 900,
  //     background: '#CECEFC',
  //     // stroke: '#000',
  //     // lineWidth: 2,
  //     renderer: canvasRenderer,
  //   })

  //   // console.log(20, canvas)

  //   globalData.canvas = canvas

  //   // for (let i = 0; i < deviceBallList.length; i++) {
  //   //   const deviceBall = new DeviceBall({
  //   //     name: deviceBallList[i].name,
  //   //     x: 300 * i + 100,
  //   //     y: 200,
  //   //     canvas,
  //   //     globalData,
  //   //     ifAnimationsMutexeMap,
  //   //   })
  //   //   console.log(21, deviceBall)

  //   //   // globalData.canvas.appendChild(deviceBall)
  //   // }

  //   const ring = new Ring({
  //     x: 400,
  //     y: 400,
  //     canvas,
  //     globalData,
  //   })

  //   console.log(57, ring)
  // }, [globalData, deviceBallList, ifAnimationsMutexeMap])

  const arr = new Array(10000).fill(1)
  arr.forEach((item, index) => (arr[index] = index + 1))

  console.time('init')
  console.log(Date.now())

  useEffect(() => {
    console.timeEnd('init')
  })

  return (
    <div className='App'>
      <div id='canvasWrap'></div>
      <DeviceBall></DeviceBall>
    </div>
  )
}

export default App
