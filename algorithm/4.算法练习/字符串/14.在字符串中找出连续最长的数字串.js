function longestNumberStr(str) {
// while (str = readline()) {

	const tmpArr = str.replace(/[^0-9]+/g, ' ').split(' ').sort((a, b) => {
		if (b.length === a.length) {
			return str.indexOf(a) - str.indexOf(b)
		} else {
			return b.length - a.length
		}
	})

	const max = tmpArr[0].length

	const result = tmpArr.filter(item => item.length === max).join('')
	console.log(result + ',' + max)
}

longestNumberStr('abcd12345ed125ss123058789')

// https://www.nowcoder.com/practice/2c81f88ecd5a4cc395b5308a99afbbec?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1. 非数字的替换
// 'abcd12345ed125ss123058789'.replace(/[^0-9]+/g, ' ') === ' 12345 125 123058789'
// 'abcd12345ed125ss123058789'.replace(/[^0-9]/g, ' ') === '    12345  125  123058789'

// 2. 多条件下的排序
// 	const tmpArr = str.replace(/[^0-9]+/g, ' ').split(' ').sort((a, b) => {
// 		if (b.length === a.length) {
// 			return str.indexOf(a) - str.indexOf(b)
// 		} else {
// 			return b.length - a.length
// 		}
// 	})
