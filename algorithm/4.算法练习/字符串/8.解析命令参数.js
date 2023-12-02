// while (str = readline()) {
function getParams (str) {
	let index = 0
	for (let i = 0; i < str.length; i++) {
		if (str[i] === '"') {
			index = (index + 1) % 2
			str = str.slice(0, i) + str.slice(i + 1, str.length)
		}
		else if (str[i] === ' ' && index === 1) {
			str = str.slice(0, i) + '-' + str.slice(i + 1, str.length)
		}
	}
	const arr = str.split(' ')
	console.log(arr.length)
	for (let item of arr) {
		console.log(item.replace(/[\-]/g, ' '))
	}
}

getParams('u "a e i o u" r')

// xcopy /s "C:\\program files" "d:\"
// https://www.nowcoder.com/practice/668603dc307e4ef4bb07bcd0615ea677?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结
// 1. 处理index 在0,1中循环切换
// 	let index = 0
// 	for (let i = 0; i < 10; i++) {
// 		index = (index + 1) % 2
// 		console.log(index)
// 	}

// 2. slice的用法, slice(a, b), 包含a, 不包含b, 注意 a, b超出长度的情况
// 	'1234'.slice(0, 3) === '123'
// 	'1234'.slice(3, 3) === ''
// 	'1234'.slice(2, 5) === '123'
// 	'1234'.slice(6, 7) === ''

// 	[1, 2, 3, 4].slice(0, 3) === [1, 2, 3]
// 	[1, 2, 3, 4].slice(3, 3) === []
// 	[1, 2, 3, 4].slice(2, 5) === [3, 4]
// 	[1, 2, 3, 4].slice(6, 7) === []

// 3. 字符串移除某个字符
// str = str.slice(0, i) + str.slice(i + 1, str.length)
// let c = '123456789'
// c = c.slice(0, 4) + c.slice(5, 9)  === '12346789'

// 4. 字符串转数组 split
// ',1,2,3,4,'.split(',') === ['', '1', '2', '3', '4', '']

// 5. replace的用法
// 	'1-2-3'.replace('-', ' ') === '1 2-3'
// 	'1-2-3'.replace(/[\-]+/g, ' ') === '1 2 3'
// 	'12  3         4 5  9'.replace(/[\s]+/g, ' ') === '12 3 4 5 9'