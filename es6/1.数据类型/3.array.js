// https://www.w3school.com.cn/jsref/jsref_findindex.asp
/******************一. 判断对象是否是数组************************************/
console.log('一. 判断对象是否是数组')
// Array.isArray
// 语法: Array.isArray(obj)
console.log('---------------Array.isArray----------------')
let a = 'abcdefg'
let b = { name: 'aa' }
let c = [1, 2, 3, 4]
console.log(Array.isArray(a))
console.log(Array.isArray(b))
console.log(Array.isArray(c))

/******************二. 判断数组中是否包含某个元素************************************/
console.log('二. 判断数组中是否包含某个元素')
// indexOf
// 语法: array.indexOf(item, start)
console.log('---------------indexOf----------------')
console.log(c.indexOf(3))
console.log(['a', 'b', 'c', 'd'].indexOf('b'))

// lastIndexOf
// 语法: array.lastIndexOf(item, start)
console.log('---------------lastIndexOf---------------')
console.log(c.lastIndexOf(3))
console.log(['a', 'b', 'c', 'd'].lastIndexOf('b'))

// findIndex
// 语法: array.findIndex(function(currentValue, index, arr), thisValue)
console.log('---------------findIndex----------------')
console.log(c.findIndex((item) => item > 2))

// find
// 语法: array.find(function(currentValue, index, arr), thisValue)
console.log('-----------------find------------------')
console.log(c.find((item) => item > 2))

// includes
// 语法: array.includes(element, start)
console.log('-----------------includes------------------')
console.log(c.includes(2))

/*****************三. 判断数组中的元素是否满足条件*********************/
console.log('三. 判断数组中的元素是否满足条件')
// some
// 语法: array.some(function(currentValue, index, arr), thisValue)
console.log('-----------------some------------------')
let k = [5, 6, 7, 8]
console.log(k.some((item) => item > 6))
console.log(k.some((item) => item > 60))

// every
// 语法: array.every(function(currentValue, index, arr), thisValue)
console.log('-----------------every------------------')
console.log(k.every((item) => item > 4))
console.log(k.every((item) => item > 6))

/********四. 数组过滤 (不改变原数组, 产生一个新数组)***********/
console.log('四. 数组过滤 (不改变原数组, 产生一个新数组)')
// filter
// 语法: array.filter(function(currentValue, index, arr), thisValue)
console.log('-----------------filter------------------')
console.log(
  c.filter((item) => item > 2),
  c
)

/******************五. 数组元素增加, 删除, 插入操作(改变原数组)*********************/
console.log('五. 数组元素增加, 删除操作(改变原数组)')
// push
// 语法: array.push(item1, item2, ..., itemX), 返回数组的新长度
console.log('-----------------push------------------')
console.log(c.push(5, 6), c)

// unshift
// 语法: array.unshift(item1, item2, ..., itemX)  返回数组的新长度
console.log('-----------------unshift------------------')
let d = [4, 5, 6]
console.log(d.unshift(1, 2, 3), d)

// pop
// 语法: array.pop(), 移除数组的最后一个元素，并返回该元素
console.log('-----------------pop------------------')
console.log(d.pop(), d)

// shift
// 语法: array.shift(), 移除数组第一个元素, 并返回该元素
console.log('-----------------shift------------------')
console.log(d.shift(), d)

// splice
// 语法: array.splice(index, howmany, item1, ....., itemX)
console.log('-----------------splice------------------')
let e = [1, 2, 3, 4, 5]
console.log(e.splice(2, 3, 'a', 'b', 'c'), e)

// /******************六. 数组元素的填充, 产生一个新数组, 并改变原数组*********************/
console.log('六. 数组元素的填充, 产生一个新数组, 并改变原数组')
// fill
// 语法: array.fill(value, start, end), 返回一个新数组, 改变原数组
console.log('-----------------fill------------------')
let j = [1, 2, 3, 4, 5]
console.log(j.fill('a', 2, 4), j)

/******************七. 数组拼接, 截断(不改变原数组, 产生一个新数组)*********************/
console.log('七. 数组拼接, 截断(不改变原数组)')
// concat
// 语法: array1.concat(array2, array3, ..., arrayX), 返回一个新数组
// 语法: array1.concat(array2, array3, ..., arrayX), 返回一个新数组
console.log('-----------------concat------------------')
let f = [1, 2]
console.log(f.concat([3], [4]), f)

// slice
// 语法: array.slice(start, end), 参数为起始位置和结束位置, 返回一个新数组
console.log('-----------------slice------------------')
let g = [1, 2, 3, 4, 5]
console.log(g.slice(2, 4), g)

/******************八. 数组的排序, 顺序反转, 产生一个新数组, 并改变原数组*********************/
console.log('八. 数组的排序, 顺序反转, 产生一个新数组, 并改变原数组')
// sort
// 语法: array.sort(compareFunction), 返回一个新数组
console.log('-----------------sort------------------')
let h = [2, 1, 4, 5, 3]
console.log(
  h.sort((a, b) => a - b),
  h
)

// reverse
// 语法: array.reverse(), 返回一个新数组
console.log('-----------------reverse------------------')
let i = [1, 2, 3, 4]
console.log(i.reverse(), i)

/*************************九. 数组的遍历, 不改变原数组****************************/
console.log('九. 数组的遍历, 不改变原数组')
// keys
// 语法: array.keys(), 返回带有数组键的 Array Iterator 对象。
console.log('-----------------keys------------------')
let m = ['a', 'b', 'c', 'd']
console.log(m.keys(), m)

// entries
// 语法: array.entries(), 返回带有键/值对的 Array Iterator 对象
console.log('-----------------entries------------------')
let n = ['a', 'b', 'c', 'd']
console.log(m.entries(), m)

// map
// 语法: array.map(function(currentValue, index, arr), thisValue)
console.log('-----------------map------------------')
let l = [1, 2, 3, 4]
console.log(
  l.map((item) => item ** 2),
  l
)

// forEach
// 语法: array.every(function(currentValue, index, arr), thisValue)
console.log('-----------------forEach------------------')
l.forEach((item) => console.log(item ** 2))

// reduce
// 语法: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
console.log('-----------------reduce------------------')
console.log(l.reduce((total, item) => total + item, 100))

// reduceRight
// 语法: array.reduceRight(function(total, currentValue, currentIndex, arr), initialValue)
console.log('-----------------reduceRight------------------')
console.log(l.reduceRight((total, item) => total + item, 100))

/*************************十. 数组转为字符串****************************/
console.log('十. 数组转为字符串')
// join
// 语法: array.join(separator), 返回一个新的字符串, 不改变原数组
console.log('-----------------join------------------')
let o = [1, 2, 3, 4]
console.log(o.join('*'))
