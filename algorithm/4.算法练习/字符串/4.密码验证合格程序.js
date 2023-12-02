// while (str = readline()) {
function isIeagle (str) {
	let count = 0
	if (str.match(/[A-Z]/g)) count++
	if (str.match(/[a-z]/g)) count++
	if (str.match(/[0-9]/g)) count++
	if (str.match(/[\`\~\!\@\#\$\%\^\&\*\(\)\+\-\:\;\"\/\?\>\<\,\[\]\{\}\]]/g)) count++
	
	let common = ''
	
	for (let i = 0; i < str.length; i++) {
			for (let j = 1; j < str.length; j++) {
				const current = str.slice(i, j)
				const right = str.slice(j, str.length)
				if (right.indexOf(current) > 0&& current.length > common.length) common = current
			}
	}
	if (str.length <= 8 || count < 3 || common.length > 2) {
			console.log('NG')
	} else {
			console.log('OK')
	}
}

isIeagle('021$bc9000')

// https://www.nowcoder.com/practice/184edec193864f0985ad2684fbc86841?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结: 
// 1. 判断字符串中有大写字母 /[A-Z]/g.test('1233sdafkjhHkk')
// 2. 判断字符串中有小写字母 /[a-z]/g.test('1233sdafkjhHkk')
// 3. 判断字符串中有数字 /[0-9]/g.test('1233sdafkjhHkk')
// 4. 判断字符串中有特殊字符 /[\`\~\!\@\#\$\%\^\&\*\(\)\+\-\:\;\"\/\?\>\<\,\[\]\{\}\]]/g.test('1233sdafkjhHkk')
// 5. 判断字符串中是否有重复的子串
// 	for (let i = 0; i < str.length; i++) {
// 		for (let j = 1; j < str.length; j++) {
// 			const current = str.slice(i, j)
// 			const right = str.slice(j, str.length)
// 			if (right.indexOf(current) > 0&& current.length > common.length) common = current
// 		}
// 	}
