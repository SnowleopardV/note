// 一、用类型 + []表示数组类型
const arr: number[] = [1, 2, 3, 4, 5]
const arr2: string[] = ['a', 'b', 'c', 'd', 'e']

// 二、用数组泛型 Array<类型> 表示数组类型
const arr3: Array<number> = [1, 2, 3, 4, 5]
const arr4: Array<string> = ['a', 'b', 'c', 'd', 'e']

// 三、用接口表示数组类型
interface NumberArray {
  [index: number]: number
}
const arr5: NumberArray = [1, 2, 3, 4, 5]

// 四、类数组表示
