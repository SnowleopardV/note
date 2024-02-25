import { TAG_ROOT, ELEMENT_TEXT, TAG_TEXT, PLACEMENT } from './const'
import { setProps } from './util'
/*
两个阶段: 
待完善
1. reconciliation
2. commit 进行DOM更新、创建, 此阶段是不能暂停

// 二、render阶段有两个任务
1. 根据虚拟DOM生成Fiber树,
2. 收集effectlist
*/

let nextUnitOfWork = null
let workInProgressFiber = bull

const reconcileChildren = (currentFiber, newChildren) => {
  let newChildIndex = 0
  let prevSibling = null // 上一个新的子fiber

  // 遍历子虚拟DOM, 为每个虚拟DOM创建子Fiber
  while (newChildIndex < newChildren.length) {
    let newChild = newChildren(newChildIndex)
    let tag

    if (newChild.type === ELEMENT_TEXT) {
      tag = TAG_TEXT
    } else if (typeof newChild.type === 'string') {
      tag = TAG_HOST
    }

    let newFiber = {
      tag,
      type: newChild.type,
      props: newChild.props,
      stateNode: null, // DOM元素还没有被创建
      return: currentFiber,
      effectTag: PLACEMENT, // 副作用收集、新增、更新、删除啊
      nextEffect: null, // 指向下一个effect
    }

    if (newFiber) {
      if (newChildIndex === 0) {
        currentFiber.child = newFiber
      } else {
        prevSibling.sibling = newFiber
      }
      prevSibling = newFiber
    }

    newChildIndex++
  }
}

const updateHostRoot = (currentFiber) => {
  let newChidren = fiber.props.chidren
  reconcileChildren(currentFiber, newChildren)
}

const updateDOM = (stateNode, props, newProps) => {
  setProps(stateNode, props, newProps)
}

const createDOM = (currentFiber) => {
  if (currentFiber.tag === TAG_TEXT)
    return document.createTextNode(currentFiber.props.text)
  else if (currentFiber.tag === TAG_HOST) {
    let stateNode = document.createElement(currentFiber.type)
    updateDOM(stateNode, {}, currentFiber.props)
    return stateNode
  }
}

const updateHostText = (currentFiber) => {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
}

const updateHost = (currentFiber) => {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }

  const newChildren = currentFiber.props.children
  reconcileChildren(currentFiber, newChildren)
}

const beginWork = (currentFiber) => {
  //
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber)
  } else if (currentFiber.tag === TAG_TEXT) {
    updateHostText(currentFiber)
  } else if (currentFiber.tag === TAG_HOST) {
    updateHost(currentFiber)
  }
}

const completeUnitOfWork = () => {}

const performUnitOfWork = (currentFiber) => {
  beginWork(currentFiber)

  if (currentFiber.child) return currentFiber.child

  while (currentFiber) {
    completeUnitOfWork(currentFiber)

    if (currentFiber.sibling) return currentFiber.sibling
    currentFiber = currentFiber.return
  }
}

const workLoop = (deadline) => {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  if (!nextUnitOfWork) {
    console.log('render执行结束')
  }
  requestIdleCallback(workLoop, { timeout: 500 })
}

const scheduleRoot = (rootFiber) => {
  nextUnitOfWork = rootFiber
  workInProgressFiber = rootFiber
}

requestIdleCallback(workLoop, { timeout: 500 })

export default {
  scheduleRoot,
}
