// 案例4 打印杨辉三角
//           1
//        1     1
//     1     2     1
//   1    3     3     1
// 1   4     6     4     1

const yanghui = (n) => {
  if (n === 1) return [1]
  if (n === 2) return [1, 1]

  let queue = [1, 1]
  let i = 3

  while (i <= n) {
		newQueue = []

    while (newQueue.length < i - 2) {
      const a = queue.shift()
      const b = queue[0]
      newQueue.push(a + b)
    }

    newQueue.push(1)
    newQueue.unshift(1)

    queue = [...newQueue]
    i++
  }

  return queue
}

console.log(yanghui(3))
console.log(yanghui(4))
console.log(yanghui(5))
console.log(yanghui(6))
console.log(yanghui(20))
