/******************一. 判断字符串是否包含另一个字符串****************************************/
console.log('一. 判断字符串是否包含另一个字符串')
// 1. indexof(s, start)
// 返回索引值, 没有为-1, 可以传第二个可选参数, 表示检索的起始位置(含)
console.log('---------indexOf---------')
let a = 'abcdeabfg'
console.log(a.indexOf('ab'))
console.log(a.indexOf('ab', 3))

// 2. lastIndexof
// 可以传第二个可选参数, 表示检索的起始位置
console.log('---------lastIndexOf------')
console.log(a.lastIndexOf('ab'))
console.log(a.lastIndexOf('ab', 2))

// 3. search
// 返回从左到右第一次出现的索引值, 和indexOf的区别, search可以传入正则表达式
console.log('---------search------')
let c = 'sdafj12kjljk'
console.log(a.search(/\d/))

// 4. match
// 返回匹配上的字符串或者字符串数组, 传参可以是字符串,也可以是正则表达式
console.log('---------match---------')
console.log(a.match('ab'))
console.log(a.match(/ab/g))

// 5. includes()
console.log('---------includes---------')
console.log(a.includes('bcd'))
console.log(a.includes('123'))
console.log(a.includes('123'))

// 6. startsWith
// 第二个参数为可选, 表示起始位置
console.log('---------startsWith--------')
console.log(a.startsWith('abc'))
console.log(a.startsWith('bc', 1))
console.log(a.startsWith('bhg'))

// 7. endsWith
// 第二个参数为可选, 表示结束位置
console.log('---------endsWith---------')
console.log(a.endsWith('efg'))
console.log(a.endsWith('ef', 6))
console.log(a.endsWith('bhg'))

/**********************二. 字符串复制, 填充, 补全 不改变原字符串************************************/
console.log('二. 字符串复制, 填充, 补全')
// 1. repeat
console.log('---------repeat----------')
console.log(a.repeat(0), a.repeat(0) === '', a)
console.log(a.repeat(2))
console.log(a)

// 2. padStart
// 第一个参数为要填充到的长度, 第二个参数为要填充的字符串
console.log('---------padStart--------')
let b = '12321'
console.log(b.padStart(6, 'abc'), b)
console.log(b.padStart(7, 'abc'))

// 3.padEnd
// 第一个参数为要补全到的长度, 第二个参数为要填充的字符串
console.log('---------padStart--------')
console.log(b.padEnd(6, 'abc'), b)
console.log(b.padEnd(7, 'abc'))

/**********************三. 字符串的替换(不改变原字符串)**********************************/
console.log('三. 字符串的替换(不改变原字符串)')
// 1. trim
console.log('---------trim--------')
let d = ' nbn nbnbn bnbn '
console.log(d.trim(), d.trim().length, d.length)

// 2. toLowerCase 3. toUperCase
console.log('---------toLowerCase toUperCase--------')
let e = 'abcDEF'
console.log(e.toLowerCase(), e)
console.log(e.toUpperCase(), e)

// 4. replace
// 第一个参数可以是字符串, 也可以是正则表达式
console.log('---------replace--------')
let f = 'abcefgabcefg'
console.log(f.replace('abc', 11))
console.log(f.replace(/abc/g, 11), f)

/**********************四. 字符串的拼接, 截断, 截取, 不改变原字符串**********************************/
console.log('四. 字符串的拼接, 截断, 截取, 不改变原字符串')
// 1. concat
console.log('---------concat--------')
let g = 'abc'
console.log(g.concat('1234'), g)
console.log(g.concat('5678', 'abcd', 'efgh'), g)

// 2. split
console.log('---------split--------')
let h = '23423,2134231,1234132'
console.log(h.split(','), h)
console.log(h.split('2'), h)

// 3. slice
// 截取指定位置的字符串, 参数是两个索引值, 包含第一个, 不包含第二个
// 和subtring的区别, substring的第二个参数不能为负值
console.log('---------slice--------')
let i = '0123456'
console.log(i.slice(1, 4), i)
console.log(g.slice(1, 2), g)
console.log(i.slice(1, -1), i)

// 4. substring
console.log('---------substring--------')
console.log(i.substring(1, 4), i)
console.log(g.substring(1, 2), g)

// 5. substr
// 和substring的却别, substr第二个参数为需要截断的长度
console.log('---------substr--------')
console.log(i.substr(1, 4), i)

/**********************五. 返回指定下标下的字符和字符编码**********************************/
console.log('五. 返回指定下标下的字符和字符编码')
// 1. charAt
console.log('---------charAt--------')
let j = 'abcdefg'
console.log(j.charAt(2))

// 2. charCodeAt
console.log('---------charCodeAt--------')
console.log(j.charCodeAt(2))

/**********************六. 由字符编码生存字符*******************************/
console.log('六. 由字符编码生存字符')
// String.fromCharCode
console.log('---------String.fromCharCode--------')
let k = 'a'.charCodeAt()
console.log(String.fromCharCode(k), String.fromCharCode(k - 33))
