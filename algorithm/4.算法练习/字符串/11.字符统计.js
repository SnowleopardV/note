// while (str = readline()) {
function getCharCount (str) {
	let counts = {}
	for (let i = 0; i < str.length; i++) {
		if (!counts[str[i]]) counts[str[i]] = 1
		else counts[str[i]]++
	}

	let arr = Object.entries(counts).sort((a, b) => {
		if (a[1] === b[1]) {
			return a[0].charCodeAt(0) - b[0].charCodeAt(0)
		} else {
			return b[1] - a[1]
		}
	}).map(item => item[0])
	
	console.log(arr.join(''))

} 

getCharCount('aaddccdc')

// https://www.nowcoder.com/practice/c1f9561de1e240099bdb904765da9ad0?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1. 字典的使用
// 	for (let i = 0; i < str.length; i++) {
// 		if (!counts[str[i]]) counts[str[i]] = 1
// 		else counts[str[i]]++
// 	}
// 2. sort多个条件下的排序, 要求不同字母出现次数的降序表示。若出现次数相同，则按ASCII码的升序输出
// 	let arr = Object.entries(counts).sort((a, b) => {
// 		if (a[1] === b[1]) {
// 			return a[0].charCodeAt(0) - b[0].charCodeAt(0)
// 		} else {
// 			return b[1] - a[1]
// 		}
// 	}).map(item => item[0])
// 3. map的使用, 不改变原数组
// 	let a = [1, 2, 3]
// 	let b = a.map(item => item * item)
// 	a === [1, 2, 3]
// 	b === [1, 4, 9]
//  let c = a.map(String) 
//  c === ['1', '2', '3']
//  let d = a.map(Boolean)
//  d === [true, true, true, true]