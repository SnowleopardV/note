let BonusCount = 0
let count = 0
let all = 0
// while (str = readline()) {
function BonusCountAndAverage(nums) {
	const strs = nums.split(',').map(Number)
	for (let str of strs) {
		const num = parseInt(str)

		if (num < 0) BonusCount++
		else {
			count ++
			all += num
		}
	}
	console.log(BonusCount)
	console.log(count == 0 ? '0.0' : (all / count).toFixed(1))
}

BonusCountAndAverage('-12,1,2')

// https://www.nowcoder.com/practice/64f6f222499c4c94b338e588592b6a62?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1. 取小数点后1位, toFixed(1)
// 	(all / count).toFixed(1)