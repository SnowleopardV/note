function useState(initialState) {
  const [state, setState] = createState(initialState)

  function createState(initialState) {
    let _state = initialState
    const listeners = new Set()

    function getState() {
      return _state
    }

    function setState(newState) {
      _state = newState
      listeners.forEach((listener) => listener())
    }

    function subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    }

    return [getState, setState, subscribe]
  }

  // 返回的setState函数需要更新组件
  const setStateAndUpdateComponent = (newState) => {
    setState(newState)
    // 触发组件重新渲染
    ReactDOM.render(<YourComponent />, document.getElementById('root'))
  }

  // 使用useEffect模拟组件挂载后订阅状态变更
  useEffect(() => {
    const unsubscribe = state[2](forceUpdate)
    return () => {
      unsubscribe()
    }
  }, [])

  // forceUpdate用于强制组件重新渲染
  const forceUpdate = React.useState()[1]

  return [state[0], setStateAndUpdateComponent]
}
