import { TAG_ROOT } from '../const'
const render = (element, container) => {
  let rootFiber = {
    tag: TAG_ROOT, // 元素的类型
    stateNode: container,
    props: {
      children: [element],
    },
  }

  scheduleRoot(rootFiber)
}

export default {
  render,
}
