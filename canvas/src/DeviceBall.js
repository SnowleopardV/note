import { nanoid } from 'nanoid'
import { Component } from 'react'
const { Circle } = window.G

class DeviceBall extends Component {
  constructor(props) {
    console.log(7, props)
    super(props)
    this.state = {
      id: nanoid(),
    }
  }

  componentWillMount() {
    console.log(15)
    const name = 'deviceBall'
    const { globalData, ifAnimationsMutexeMap, x, y, canvas } = this.props
    let { animateRunningList, animateFinishedList } = globalData
    const id = this.state.id

    console.log(13, animateRunningList, animateFinishedList)

    const circle = new Circle({
      style: {
        cx: x,
        cy: y,
        achor: [0.5, 0.5],
        r: 50,
        fill: '#0099CC',
      },
      id,
      name,
    })

    canvas.appendChild(circle)

    circle.addEventListener('click', () => {
      // 动画分为:
      // 1. 正向动画
      // 1.1 未执行
      // 1.2 执行中
      // 1.3 执行完成

      // 2. 反向动画
      // 2.1 未执行
      // 2.2 执行中
      // 2.3 执行完成

      // 互斥动画

      // 并行动画

      // 一、正在进行中的动画
      // 1. 当前元素未完成的动画
      const currentRunningAnimation = animateRunningList.filter(
        (item) => item.effect.target.id === id
      )

      // 2. 其他元素未完成的动画
      const otherRunningAnimations = animateRunningList.filter(
        (item) => item.effect.target.id !== id
      )

      // 当前元素执行中的动画反向执行
      // while ()
      if (currentRunningAnimation.length) currentRunningAnimation[0].reverse()

      // 其他元素动画, 如果是互斥关系, 并且正向执行, 则将其反向执行
      while (otherRunningAnimations.length) {
        const animationItem = otherRunningAnimations.pop()
        const { name } = animationItem.effect.target

        const ifAnimationsMutexe =
          ifAnimationsMutexeMap[`deviceBall_${name}`.toUpperCase()] ||
          ifAnimationsMutexeMap[`${name}_deviceBall`.toUpperCase()]

        console.log(56, name, ifAnimationsMutexe, animationItem.playbackRate)
        // 如果属于互斥关系, 并且动画方向相同, 需要动画执行reverse

        if (ifAnimationsMutexe && animationItem.playbackRate === 1)
          animationItem.reverse()
      }

      // 二、已完成的动画
      // 1. 当前元素已完成的动画
      const currentFinishedAnimation = animateFinishedList.filter(
        (item) => item.effect.target.id === id
      )

      // 2. 其他元素已完成的动画
      const otherFinishedAnimations = animateFinishedList.filter(
        (item) => item.effect.target.id !== id
      )

      // 当前元素已完成的动画,反向执行
      if (currentFinishedAnimation.length) {
        console.log(86)
        currentFinishedAnimation[0].reverse()

        animateRunningList.push(currentFinishedAnimation[0])
        animateFinishedList = animateFinishedList.filter(
          (item) => item.effect.target.id !== id
        )
      }

      console.log(93, otherFinishedAnimations)

      // 其他元素已经完成的动画, 如果是互斥, 需要反向执行
      while (otherFinishedAnimations.length) {
        console.log(98)
        const animationItem = otherFinishedAnimations.pop()

        const { name } = animationItem.effect.target

        const ifAnimationsMutexe =
          ifAnimationsMutexeMap[`deviceBall_${name}`.toUpperCase()] ||
          ifAnimationsMutexeMap[`${name}_deviceBall`.toUpperCase()]

        console.log(104, ifAnimationsMutexe)
        if (ifAnimationsMutexe) {
          console.log(106, animationItem.effect.target.id)
          // animationItem.play()
          animationItem.reverse()

          animateRunningList.push(animationItem)
          animateFinishedList = animateFinishedList.filter(
            (item) => item.effect.target.id !== id
          )
        }
      }

      // 三、当前动画未执行
      if (!currentFinishedAnimation.length && !currentRunningAnimation.length) {
        const animate = circle.animate(
          [
            {
              transform: 'scale(1)',
            },
            {
              transform: 'scale(2)',
            },
            {
              transform: 'scale(3)',
            },
          ],
          {
            duration: 2000,
            fill: 'both',
          }
        )

        console.log(141, id)
        animateRunningList.push(animate)

        animate.onfinish = (e) => {
          animateRunningList = animateRunningList.filter(
            (item) => item.effect.target.id !== id
          )

          if (e.target.playbackRate === 1) {
            animateFinishedList.push(animate)
          }
          console.log(144, animateFinishedList)
        }
      }
    })
  }

  render() {
    return <></>
  }
}

// function DeviceBall(props) {
//   // const id = nanoid()
//   // const [id, setId] = useState(nanoid())
//   // console.log(8, setId)

// }

export default DeviceBall
