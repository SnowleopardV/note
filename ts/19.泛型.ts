// 一、一般示例
// 我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。
function crateArr<T>(length: number, value: T): Array<T> {
  let result: Array<T> = []
  for (let i = 0; i < length; i++) {
    result.push(value)
  }
  return result
}

// 二、多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

// 三、类型约束
interface LengthWise {
  length: number
}

function a<T extends LengthWise>(obj: T): T {
  console.log(obj.length)
  return obj
}
