// while (str = readline()) {
function getRingStr (str) {
	let ringStr = ''
  for (let i = 0; i < str.length; i++) {
		for (let j = 1; j < str.length; j++) {
			const current = str.slice(i, j).split('').reverse().join('')
			const right = str.slice(j, str.length)

			const index = right.indexOf(current)

			if (index === 0 ) {
				const tmp = current.split('').reverse().join('') + current
				if (tmp.length > ringStr.length) ringStr = tmp
			}
			if (index === 1) {
				const tmp = current.split('').reverse().join('') + right[0] + current
				if (tmp.length > ringStr.length) ringStr = tmp
			}
		}
	}
	console.log(ringStr)
}

getRingStr('1231abcdcba1')

// https://www.nowcoder.com/practice/12e081cd10ee4794a2bd70c7d68f5507?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1
// 总结:
// 1. 字符串的反转
// 	'123456789'.split('').reverse().join('')
