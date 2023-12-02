// while (str = readline()) {
function primeNumbers(str) {
	let num = parseInt(str)
	const result = []

	for (let i = 2; i <= num; i++) {
		while (num % i === 0) {
			num = num / i
			result.push(i)
		}
	}
	console.log(result.join(' '))
}

primeNumbers(180)
// https://www.nowcoder.com/practice/196534628ca6490ebce2e336b47b3607?tpId=37&tqId=21225&rp=1&ru=%2Fta%2Fhuawei&qru=%2Fta%2Fhuawei%2Fquestion-ranking

// 总结:
// 1. 质数的计算方法
// 	180 / 2 = 90
// 	90 / 2 = 45
// 	45 / 3 = 15
// 	15 / 3 = 5
// 	5 / 5 = 1

// 2. 结合while循环的使用, 计算质数
// 	while (num % i === 0) {
// 		num = num / i
// 		result.push(i)
// 	}