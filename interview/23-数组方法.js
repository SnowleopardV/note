// 一、判断是否是一个数组
// 1. Array.isArray
// const arr = [1, 2, 3]
// const str = '123'
// const obj = {}

// console.log(7, Array.isArray(arr))
// console.log(8, Array.isArray(str))
// console.log(9, Array.isArray(obj))

// 二、判断是否包含某个元素
// 1. indexOf(item, start) 第二个参数为可选参数, 表示起始位置(含)
// const arr = [1, 2, 3, 4, 5]
// console.log(14, arr.indexOf(3))
// console.log(15, arr.indexOf(3, 2))
// console.log(16, arr.indexOf(3, 3))

// 2. lastIndexOf(item, start) 第二个参数为可选参数, 表示起始位置(含)
// const arr = [1, 2, 3, 4, 5]
// console.log(20, arr.lastIndexOf(3))
// console.log(21, arr.lastIndexOf(3, 2))
// console.log(22, arr.lastIndexOf(3, 1))

// 3. findIndex((item, index, arr) => {}, this) 第2个参数为可选参数, 表示传入的this, 返回满足条件的第一个元素, 否则为-1
// const arr = [1, 2, 3, 4, 5]
// console.log(
//   27,
//   arr.findIndex((item, index, arr) => {
//     console.log(29, item, index, arr)
//     return item > 2
//   })
// )
// console.log(
//   34,
//   arr.findIndex((item) => {
//     console.log(36, this)
//     return item * item > 9
//   }, [])
// )
// console.log(
//   41,
//   arr.findIndex((item) => item * item > 100, [])
// )

// 4. find((item, index, arr) => {}, this) 第二个参数为可选参数, 返回第一个满足条件的item, 否则为undefined
// const arr = ['1', '2', '3', '4', '5']
// console.log(
//   48,
//   arr.find((item, index, arr) => item * item > 4)
// )
// console.log(
//   52,
//   arr.find((item, index, arr) => item * item > 400)
// )

// 5. includes(item, start) 第二个为可选参数, 表示起始位置(含), 返回true/false
// const arr = [1, 2, 3, 4, 5]
// console.log(58, arr.includes(3))
// console.log(59, arr.includes(3, 2))
// console.log(60, arr.includes(3, 3))

// 三、判断是否满足条件
// 1. some((item, index, arr) => {}, this) 第二个为可选参数, 表示传入的this对象
// const arr = [1, 2, 3, 4, 5]
// console.log(
//   66,
//   arr.some((item, index, arr) => {
//     console.log(66, item, index, arr)
//     return item > 4
//   })
// )

// 2. every((item, index, arr) => {}, this) 第二个参数为可选参数, 表示传入的this对象
// const arr = [1, 2, 3, 4, 5]
// console.log(
//   76,
//   arr.every((item, index, arr) => item > 2)
// )
// console.log(
//   80,
//   arr.every((item, index, arr) => item > 0)
// )

// 四、数组过滤
// 1. filter((item, index, arr) => {}, this) 第二个为可选参数, 表示传入的this对象, 返回一个新数组, filer方法不改变原数组
// const arr = [1, 2, 3, 4, 5]
// const filterArr = arr.filter((item, index, arr) => item > 2)
// const filterArr2 = arr.filter((item, index, arr) => item > 6)
// console.log(89, filterArr, filterArr2, arr)

// 五、数组的新增、删除操作
// 1. push(...item) push返回原数组的新长度, 改变原数组
// const arr = [1, 2, 3, 4, 5]
// console.log(arr.push(0), arr)
// const arr2 = [1, 2, 3, 4, 5]
// const arr3 = [6, 7, 8, 9, 10]
// console.log(arr2.push(...arr3), arr2)

// 2. unshift(...items) unshift返回原数组新的长度, 改变原数组
// const arr = [6, 7, 8, 9, 10]
// console.log(102, arr.unshift(5), arr)
// const arr2 = [6, 7, 8, 9, 10]
// const arr3 = [1, 2, 3, 4, 5]
// console.log(arr2.unshift(...arr3), arr2)

// 3. pop() 删除数组最后一个元素, 并且返回该元素, 改变原数组
// const arr = [1, 2, 3, 4, 5]
// console.log(108, arr.pop(), arr)
// console.log(109, arr.pop(), arr)

// 4. shift 删除数组第一个元素, 并且返回该元素, 改变原数组
// const arr = [1, 2, 3, 4, 5]
// console.log(113, arr.shift(), arr)
// console.log(114, arr.shift(), arr)

// 5. splice(start, deleteCount, ...items)
// 第1个为可选参数, 表示要删除的起始位置(含), 第2个为可选参数, 表示要删除的个数, 后续为可选参数, 表示要插入的元素
// 返回一个数组, 成员是被删除的元素, 改变原数组
// const arr = [1, 2, 3, 4, 5]
// console.log(118, arr.splice(), arr)
// const arr2 = [1, 2, 3, 4, 5]
// console.log(122, arr2.splice(2), arr2)
// const arr3 = [1, 2, 3, 4, 5]
// console.log(124, arr3.splice(2, 2), arr3)
// const arr4 = [1, 2, 3, 4, 5]
// const arr5 = [7, 8, 9, 10]
// console.log(127, arr4.splice(2, 2, ...arr5), arr4)

// 六、数组的填充
// 1. fill(value, start, end) 第2个为可选参数, 表示起始位置(含), 第3个为可选参数, 表示结束位置(不含), 返回填充后的数组, 改变原数组
// const arr = [1, 2, 3, 4, 5]
// const newArr = arr.fill('@')
// console.log(133, newArr, arr, newArr === arr)
// const arr2 = [1, 2, 3, 4, 5]
// const newArr2 = arr2.fill('@', 2)
// console.log(136, newArr2, arr2, newArr2 === arr2)
// const arr3 = [1, 2, 3, 4, 5]
// const newArr3 = arr3.fill('@', 2, 3)
// console.log(139, newArr3, arr3, newArr3 === arr3)

// 七、数组拼接
// 1. concat(...arrs) 所有参数为可选参数, 返回一个拼接后的新数组, 不改变原数组
// const arr = [1, 2, 3, 4, 5]
// const newArr = arr.concat()
// console.log(144, newArr, arr, newArr === arr)
// const arr2 = [1, 2, 3, 4, 5]
// const newArr2 = arr2.concat([6, 7, 8], [9, 10], [11, 12, 13])
// console.log(148, newArr2, arr2, newArr2 === arr2)

// 八、数组截断
// 1. slice(start, end) 第1个参数为可选参数, 表示起始位置(含), 第2个参数表示结束位置(不含)
// 返回一个新数组, 不改变原数组
// const arr = [1, 2, 3, 4, 5]
// const newArr = arr.slice()
// console.log(154, newArr, arr, newArr === arr)
// const arr2 = [1, 2, 3, 4, 5]
// const newArr2 = arr2.slice(2)
// console.log(154, newArr2, arr2, newArr2 === arr2)
// const arr3 = [1, 2, 3, 4, 5]
// const newArr3 = arr3.slice(2, 4)
// console.log(154, newArr3, arr3, newArr3 === arr3)

// 九、数组顺序变更
// 1. sort((a, b) => {}) 第1个参数为可选参数, 表示排序的规则, 返回原数组的引用, 改变原数组
// a表示后一个, b表示前一个, a - b表示升序
// const arr = [5, 4, 3, 2, 1]
// const newArr = arr.sort()
// console.log(166, arr, newArr, newArr === arr)
// const arr2 = [5, 4, 3, 2, 1]
// const newArr2 = arr2.sort((a, b) => a - b)
// console.log(171, arr2, newArr2, newArr2 === arr2)

// 2. reverse() 返回原数组的引用, 修改原数组
// const arr = [1, 'a', 2, 'b', 3, 'c']
// const newArr = arr.reverse()
// console.log(175, arr, newArr, arr === newArr)

// 十、数组的遍历
// 1. arr.keys()、arr.values()、arr.entries(), 不修改原数组
// const arr = ['a', 'b', 'c', 'd']
// console.log(181, arr.keys(), arr.values(), arr.entries())
// console.log(182, [...arr.keys()], [...arr.values()], [...arr.entries()])

// 2. map((item, index, arr) => {}, this) 第2个为可选参数, 表示传入的this对象, 返回一个新的对象, 不修改原对象
// const arr = [1, 2, 3, 4, 5]
// const newArr = arr.map((item, index, arr) => {
//   console.log(187, item, index, arr)
//   return item * item
// })
// console.log(187, arr, newArr, newArr === arr)

// 3. forEach((item, index, array) => {}, this) 第2个参数为可选参数, 表示传入的this对象, 没有返回值(undefined), 不修改原数组
// const arr = [1, 2, 3, 4, 5]
// const newArr = arr.forEach((item, index, arr) => {
//   console.log(195, item)
// })
// console.log(197, newArr, arr, arr === newArr)

// 4. reduce((preState, current, index, arr) => {}, initState) 第2个为可选参数,表示初始状态的值, 返回值根据函数逻辑, 不修改原数组
// const arr = [1, 2, 3, 4, 5]
// const newResult = arr.reduce((preState, item) => preState * item, 1)
// const newResult2 = arr.reduce((preState, item) => preState * item, 2)
// console.log(202, newResult, newResult2, arr)

// 5. reduceRight((preState, item, index, arr) => {}, initState) 第2个为可选参数, 表示初始状态的值, 返回值根据函数决定, 不修改原数组
const arr = [1, 2, 3, 4, 5]
const newResult = arr.reduceRight(
  (preState, item, index, arr) => preState * item,
  1
)
const newResult2 = arr.reduceRight(
  (preState, item, index, arr) => preState * item,
  2
)
console.log(215, newResult, newResult2, arr)
