class MyPromise {
  constructor(executor) {
    executor(this.resolve.bind(this), this.reject.bind(this))
  }

  status = 'pending' // 初始状态
  result = null // resolve时的返回值
  reason = null // reject时的返回值
  fullfilledCallback = [] // resolve时的回调
  rejectedCallback = [] // reject时的回调

  resolve(result) {
    console.log(7, 'resolve', result, this.status)
    if (this.status === 'pending') {
      this.status = 'fullfilled'
      this.result = result
      this.fullfilledCallback.forEach((fn) => fn())
    }
  }

  reject(reson) {
    console.log(11, 'reject', reson)
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.reason = reson
      this.reject(reson)
      this.rejectedCallback.forEach((fn) => fn())
    }
  }

  then(onFullfilled, onRejected) {
    if (this.status === 'fullfilled') {
      queueMicrotask(() => onFullfilled(this.result))
    } else if (this.status === 'rejected')
      queueMicrotask(() => onRejected(this.reason))
    else if (this.status === 'pending') {
      this.fullfilledCallback.push(() =>
        queueMicrotask(() => onFullfilled(this.result))
      )
      this.rejectedCallback.push(() =>
        queueMicrotask(() => onRejected(this.reason))
      )
    }
  }
}

// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(100)
//   }, 3000)
// })

// p.then(
//   (res) => console.log(43, 'res', res),
//   (reson) => console.log(44, 'reson', reson)
// )

// const p2 = new MyPromise((resolve, reject) => {
//   resolve(70)
// })

// p2.then(
//   (result) => console.log(67, result),
//   (reason) => console.log(69, reason)
// )

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('99999'), 0)
})

p3.then((result) => console.log(71, result))
  .catch((reason) => console.log(72, reason))
  .then((result) => console.log(73, result))

const p4 = new Promise((resolve, reject) => {
  setTimeout(() => reject('8888'), 0)
})

p4.then((result) => console.log(79, result))
  .catch((reason) => console.log(80, reason))
  .then((result) => console.log(81, result))

class MyPromsie {
  constructor(executor) {
    executor(this.resolve.bind(this), this.reject.bind(this))
  }

  state = 'pending'
  result = null
  reason = null
  fullFilledCallback = []
  rejectedCallback = []

  resolve(result) {
    this.result = result

    this.fullFilledCallback.forEach((fn) => fn())
  }

  reject(reason) {
    this.reason = reason
    this.rejectedCallback.forEach((fn) => fn())
  }

  then(onFillFilled, onRejected) {
    if (this.state === 'fullFilled') {
      queueMicrotask(() => onFillFilled(this.result))
    } else if (this.state === 'reject') {
      queueMicrotask(() => onRejected(this.reason))
    } else if (this.state === 'pending') {
      this.fullFilledCallback.push(() =>
        queueMicrotask(() => onFillFilled(this.result))
      )
      this.rejectedCallback.push(() =>
        queueMicrotask(() => onRejected(this.reason))
      )
    }
  }
}
