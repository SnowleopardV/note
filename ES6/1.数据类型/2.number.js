/******************一. 判断一个数值****************************************/
console.log('一. 判断一个数值')
// 1. Number.isInteger
console.log('---------Number.isInteger---------')
let a = 1232
let b = 1234.4543
let c = '23432432'
let d = 'abnvf'
console.log(Number.isInteger(a))
console.log(Number.isInteger(b))
console.log(Number.isInteger(c))
console.log(Number.isInteger(d))

// 2. Number.isNaN
// 同ES5 全局的isNaN
console.log('---------Number.isNaN---------')
console.log(Number.isNaN(a))
console.log(Number.isNaN(a/0))
console.log(Number.isNaN(12*undefined))

// 3. Number.isFinite
// 同ES5 全局的isFinite
console.log('---------Number.isFinite---------')
console.log(Number.isFinite(a/0))
console.log(Number.isFinite(1/9))

// 4. Math.sign
// 返回一个数值是正数, 负数, 或者是0
console.log('---------Math.sign---------')
console.log(Math.sign(-1))
console.log(Math.sign(1))
console.log(Math.sign(0))


/******************二. 数值生成****************************************/
//  Number.parseInt 
// 同ES5全局的paserInt方法
console.log('---------Number.parseInt----------')
let e = '123bsdncns67676'
console.log(Number.parseInt('123.999999999999'))
console.log(Number.parseInt(e), e)
console.log(Number.parseInt('asdbf1234jkk'))

// Number.parseFloat
// 同ES5全局的parseFloat方法
console.log('---------Number.parseFloat----------')
console.log(Number.parseFloat('123123.123abcdb233'))
console.log(Number.parseFloat('123'))
console.log(Number.parseFloat(123.12312321))

// Math.trunc
// 去除数值的小数部分
console.log('---------Math.trunc----------')
let f = 123.344451
console.log(Math.trunc(f), f)