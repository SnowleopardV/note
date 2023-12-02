function getKSmallest (str, num) {
// while (str = readline()) {
  const k = str.split(' ').map(Number)[1]

	// const nums = readline().split(' ').sort((a, b) => a - b)
	const nums = num.split(' ').sort((a, b) => a - b)
	const arr = []

	for (let i = 0; i < k; i++) {
		arr.push(nums[i])
	}
	console.log(arr.join(' '))
}

getKSmallest ('5 3', '1 3 5 7 2')

// https://www.nowcoder.com/practice/69ef2267aafd4d52b250a272fd27052c?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1. 字符串转数字数组 str.split(' ').map(Number)
// 2. 数组排序 arr.sort((a, b) => a - b)