const showLog = () => console.log('hhahaha11')
// 节流、防抖都属于高阶函数
// 一、节流
function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
      // console.timeEnd('debounce')
    }, delay)
  }
}

// console.time('debounce')
// const dbfn = debounce(showLog, 1000)

// const interval = setInterval(dbfn, 300)
// setTimeout(() => clearInterval(interval), 1000)

// 注意: setTimeout第一个入参是函数, 不是函数执行的结果
// setTimeout(showLog, 2000)

// 二、防抖
function throttle(fn, delay) {
  let shouldRun = true
  return (...args) => {
    if (shouldRun) {
      fn(...args)
      shouldRun = false

      setTimeout(() => (shouldRun = true), delay)
    }
  }
}

const thfn = throttle(showLog, 1000)

const interval2 = setInterval(thfn, 100)
setTimeout(() => clearInterval(interval2), 10000)
