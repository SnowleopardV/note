// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
// 请必须使用时间复杂度为 O(log n) 的算法。
// 示例 1:
// 输入: nums = [1,3,5,6], target = 5
// 输出: 2

// 示例 2:
// 输入: nums = [1,3,5,6], target = 2
// 输出: 1
// 示例 3:
// 输入: nums = [1,3,5,6], target = 7
// 输出: 4

// 1 <= nums.length <= 104
// -104 <= nums[i] <= 104
// nums 为 无重复元素 的 升序 排列数组
// -104 <= target <= 104


// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/search-insert-position
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function insertBySort(nums, target) {
	let [left, right] = [0, nums.length - 1]
	let middle = 0

	while (left <= right) {
		if ((left + right) % 2 === 1) middle = (left + right - 1) / 2
		else middle = (left + right) / 2

		if (target === nums[middle]) return middle
		else if (target < nums[middle]) right = middle - 1
		else left = middle + 1
	}

	return left
}

const nums = new Array(1000000).fill(0).map((item, index) => index)
console.time()
console.log(insertBySort(nums, 999999.4))
console.timeEnd()

console.time()
console.log(insertBySort([1,3,5,6], 5))
console.log(insertBySort([1,3,5,6], 2))
console.log(insertBySort([1,3,5,6], 7))
console.log(insertBySort([1,3,5,6], 0))
console.timeEnd()