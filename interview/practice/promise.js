class MyPromise {
  constructor(executor) {
    executor(this.resolve.bind(this), this.reject.bind(this))
  }

  state = 'pending'
  result = null
  reason = null
  fullfillCallback = []
  rejectCallback = []

  resolve(result) {
    // console.log(7, result)
    this.state = 'fullfilled'
    this.result = result

    this.fullfillCallback.forEach((fn) => fn())
  }

  reject(reason) {
    // console.log(12, reason)
    this.state = 'rejected'
    this.reason = reason

    this.rejectCallback.forEach((fn) => fn())
  }

  then(fullfilledCallback, rejectedCallback) {
    if (this.state === 'pending') {
      this.fullfillCallback.push(() =>
        setTimeout(() => fullfilledCallback(this.result))
      )
      this.rejectCallback.push(() =>
        setTimeout(() => rejectedCallback(this.reason))
      )
    } else if (this.state === 'fullfilled') {
      setTimeout(() => fullfilledCallback(this.result))
    } else if (this.state === 'rejected') {
      rejectedCallback(() => setTimeout(() => rejectedCallback(this.reason)))
    }
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => reject(100), 3000)
})

p.then(
  (result) => console.log(20, result),
  (reason) => console.log(21, reason)
)
