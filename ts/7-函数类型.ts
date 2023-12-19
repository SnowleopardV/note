// 一、函数声明
function add(x: number, y: number): number {
  return x + y
}

// 二、函数表达式
const add2: (x: number, y: number) => number = (x, y) => x + y
const add8: (x: number, y: number) => void = (x, y) => {
  console.log(x + y)
}

// 三、可选入参
const add3: (x: number, y: number, z?: number) => number = (x, y, z) =>
  z ? x + y + z : x + y

// 四、参数的默认值
const add4: (x: number, y: number) => number = (x, y = 100) => x + y
function add5(x: number, y: number = 100): number {
  return x + y
}

add4(1, 2)
add5(3)

// 五、剩余参数
const add6: (x: number, ...items: Array<number>) => number = (x, ...item) =>
  x + item.reduce((a, b) => a + b)

function add7(x: number, ...items: Array<number>) {
  return x + items.reduce((a, b) => a + b)
}
