// 一、判断字符串是否包含某个字符串
// 1. indexOf(s, start)  start为可选参数, 表示起始位置, 返回第一次匹配上的索引值, 否则返回-1
// const str = '1234567890'
// console.log(4, str.indexOf('3'), str)
// console.log(5, str.indexOf('3', 2), str)
// console.log(6, str.indexOf('3', 3), str)

// 2. lastIndexOf(s, start) start为可选参数, 表示起始位置, 返回第一次匹配上的索引值, 否则返回-1
// const str = '1234567890'
// console.log(10, str.lastIndexOf('3'), str)
// console.log(11, str.lastIndexOf('3', 3), str)
// console.log(12, str.lastIndexOf('3', 2), str)
// console.log(12, str.lastIndexOf('3', 1), str)

// 3. search(reg/string) reg为正则表达式, 返回第一次匹配上的索引值, 否则返回-1
// const str = '12345a67a890'
// console.log(17, str.search(/[a-zA-Z]/), str)
// console.log(18, str.search(/[-+]/), str)
// console.log(19, str.search('a6'), str)

// 4. match(reg/string) 返回第一次匹配上的结果(数组形式), 如果没有匹配上返回null
// const str = '12345a67a6890'
// console.log(23, str.match('a6'), str)
// console.log(24, str.match('a7'), str)
// console.log(25, str.match(/[a-zA-Z]/), str)

// 5. includes(str, start) 第一个参数为子字符串, 第二个参数表示查询的起始位置, 结果返回true/false
// const str = '1234567890'
// console.log(29, str.includes('6789'), str)
// console.log(30, str.includes('6789', 7), str)
// console.log(31, str.includes('9999'), str)

// 6. startsWith(str, start) 第一个参数为子字符串, 第二个参数为查询的起始位置, 结果返回true/false
// const str = '1234567890'
// console.log(35, str.startsWith(234), str)
// console.log(36, str.startsWith(234, 1), str)

// 7. endsWith(str, end) 第一个参数为子字符串, 第二个参数可选, 表示结束位置, 结果返回true/false
// const str = '1234567890'
// console.log(40, str.endsWith('89'), str)
// console.log(41, str.endsWith('90'), str)
// console.log(42, str.endsWith('89', 9), str)

// 二、字符串复制
// 1. repeat(count) count表示要重复的次数
// const str = '1234567890'
// console.log(47, str.repeat(3), str)
// console.log(48, str.repeat(0), str)

// 三、字符串填充
// 1.padStart(targetLength, str) 第一个参数表示填充完之后的长度, 第二个表示要填充的字符串
// const str = '12345'
// console.log(53, str.padStart(10, 'a'), str)
// console.log(54, str.padStart(10, 'ab'), str)
// console.log(55, str.padStart(10, 'abc'), str)

// 2. padEnd(targetLength, str) 第一个参数表示填充完之后的长度, 第二个参数表示填充的字符串
// const str = '12345'
// console.log(59, str.padEnd(10, 'a'), str)
// console.log(60, str.padEnd(10, 'ab'), str)
// console.log(61, str.padEnd(10, 'abc'), str)

// 四、字符串替换
// 1. trim 去除前后空格
// const str = '  12  34  5       '
// console.log(66, '*' + str.trim() + '*', str)

// 2. toLowerCase 转小写字母
// const str = 'abcdEFG'
// console.log(70, str.toLowerCase(), str)

// 3. toUpperCase 转大写字母
// const str = 'abcdEFG'
// console.log(74, str.toUpperCase(), str)

// 4. replace(str/reg, str) 第一个参数为字符串/正则表达式, 第二个参数表示替换后的字符串
// const str = '1234512345'
// console.log(str.replace('12345', 'aa'), str)
// console.log(str.replace(/12345/, 'bb'), str)
// console.log(str.replace(/12345/g, 'cc'), str)

// 五、字符串拼接
// 1. concat(...strs) 可以传入多个字符串进行拼接
// const str = '123'
// console.log(85, str.concat('456', '789', '0'), str)
// const strArr = ['456', '789', '0']
// console.log(87, str.concat(...strArr), str)

// 六、字符串的截断
// 1. split(str, limit) 第一个参数表示分割要发生的地方, 第二个参数表示限制生成的数组的长度
// const str = '123,456,789'
// console.log(92, str.split(''), str)
// console.log(93, str.split(','), str)
// console.log(94, str.split('3,4'), str)
// console.log(95, str.split('', 3), str)

// 2. slice(start, end) 第一个参数为可选参数, 表示起始位置(含), 第二参数为可选参数, 表示结束位置(不含)
// const str = '1234567890'
// console.log(99, str.slice(), str)
// console.log(100, str.slice(3), str)
// console.log(101, str.slice(3, 5), str)

// 3. substring(start, end) 第一个参数为可选参数, 表示起始位置(含), 第二个参数为可选参数, 表示结束位置(不含)
// const str = '1234567890'
// console.log(105, str.substring(), str)
// console.log(106, str.substring(3), str)
// console.log(107, str.substring(3, 5), str)

// 七、返回指定下标的字符/字符编码
// 1. charAt(index) 同[index]
const str = '1234567890'
console.log(112, str.charAt(3), str[3], str)
console.log(113, str.charAt(4), str[4], str)

// 2. charCodeAt(index)
// const str = '1234567890'
// console.log(117, str.charCodeAt(3), str)
// console.log(118, str.charCodeAt(4), str)

// 八、字符编码生成字符
// 1. String.fromCharCode
// const str = '1234567890'
// const code = str.charCodeAt(3)
// console.log(124, String.fromCharCode(code))
