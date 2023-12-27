class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload
    this.nextUpdate = nextUpdate
  }
}

class UpdateQueue {
  constructor(baseState) {
    this.baseState = baseState || null
    this.firstUpdate = null
    this.lastUpdate = null
  }

  enqueueUpdate(update) {
    if (this.firstUpdate === null) this.firstUpdate = this.lastUpdate = update
    else {
      this.lastUpdate.nextUpdate = update
      this.lastUpdate = update
    }
  }

  forceUpdate() {
    let currentState = this.baseState || {}
    let currentUpdate = this.firstUpdate

    while (currentUpdate) {
      const nextState =
        typeof currentUpdate.payload === 'function'
          ? currentUpdate.payload(currentState)
          : currentUpdate.payload

      currentState = { ...currentState, ...nextState }
      currentUpdate = currentUpdate.nextUpdate
    }

    // 清空链表结构
    this.firstUpdate = this.lastUpdate = null

    this.baseState = currentState
    // 返回最新的状态
    return currentState
  }
}

let queue = new UpdateQueue()
queue.enqueueUpdate(new Update({ name: 'jack' }))
queue.enqueueUpdate(new Update({ number: 0 }))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))
console.log(51, queue.forceUpdate())
