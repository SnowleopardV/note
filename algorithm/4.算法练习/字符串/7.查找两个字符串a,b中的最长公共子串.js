// while (str = readline()) {
function getCommonStr (str, str2) {
	const A = str
	// const B = readline()
	const B = str2

	const less = A.length <= B.length ? A : B
	const more = A.length <= B.length ? B : A

	let common = ''

	for (let i = 0; i < less.length; i++) {
		for (let j = 1; j <= less.length; j++) {
			const current = less.slice(i, j)
			if (more.includes(current) && current.length > common.length) {
				common = current
			}
		}
	}
	console.log(common)
}

getCommonStr('abcdefghijklmnop', 'abcsafjklmnopqrstuvw')

// https://www.nowcoder.com/practice/181a1a71c7574266ad07f9739f791506?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1. 判断是否包含子串的方法, 两个for循环和slice
// 	for (let i = 0; i < less.length; i++) {
// 		for (let j = 1; j <= less.length; j++) {
// 			const current = less.slice(i, j)
// 			if (more.includes(current) && current.length > common.length) {
// 				common = current
// 			}
// 		}
// 	}