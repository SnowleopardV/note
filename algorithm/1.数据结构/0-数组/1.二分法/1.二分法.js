// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
// 示例 1:
//    输入: nums = [-1,0,3,5,9,12], target = 9     
//    输出: 4       
//    释: 9 出现在 nums 中并且下标为 4     
// 示例 2:
//    输入: nums = [-1,0,3,5,9,12], target = 2     
//    输出: -1        
//    解释: 2 不存在 nums 中因此返回 -1
// 提示：
//    你可以假设 nums 中的所有元素是不重复的。
//    n 将在 [1, 10000]之间。
//    nums 的每个元素都将在 [-9999, 9999]之间

// 这道题目的前提是数组为有序数组，同时题目还强调数组中无重复元素，
// 大家写二分法经常写乱，主要是因为对区间的定义没有想清楚，区间的定义就是不变量

// 以[left, right]为边界
function binarySearch (arr, target) {
	if (!arr.length) return -1
  let [left, right] = [0, arr.length - 1]
	let middle

	for (;left <= right;) {
		if ((left + right) % 2 === 1) {
			middle = (left + right - 1) / 2
		} else {
			middle = (left + right) / 2
		}
		
		if (arr[middle] === target) return middle
		else if (arr[middle] < target) left = middle + 1
		else right = middle - 1

	}

	return -1
}

const arr = new Array(10000000).fill(0).map((item, index) => index)

console.time('binarySearch')
console.log(binarySearch(arr, 999999))
console.timeEnd('binarySearch')


function ergodic(arr, target) {
	for (let i = 0; i < arr.length; i++) {		
		if (arr[i] === target) return i
	}
	return -1
}

console.time('ergodic')
console.log(ergodic(arr, 999999))
console.timeEnd('ergodic')