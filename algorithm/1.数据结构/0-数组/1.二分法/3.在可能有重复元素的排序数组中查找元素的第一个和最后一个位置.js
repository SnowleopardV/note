// 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
// 如果数组中不存在目标值 target，返回 [-1, -1]。
// 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

// 示例 1：
// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]

// 示例 2：
// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]
// 示例 3：

// 输入：nums = [], target = 0
// 输出：[-1,-1]

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums 是一个非递减数组
// -109 <= target <= 109

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



function getStartEnd(nums, target) {
	return [getLeftBorder(nums, target), getRightBorder(nums, target)]
}

function getLeftBorder(nums, target) {
  if (!nums.length) return -1
  let middle
  let [left, right] = [0, nums.length - 1]

  for (; left <= right; ) {
    if ((left + right) % 2 === 0) middle = (left + right) / 2
    else middle = (left + right - 1) / 2

    if (nums[middle] === target) {
      if (middle === 0) return 0
      if (nums[middle - 1] === target) right = middle - 1
      else return middle
    } else if (nums[middle] < target) left = middle + 1
    else right = middle - 1
  }

  return -1
}

function getRightBorder(nums, target) {
	if (!nums.length) return -1
	let middle
	let [left, right] = [0, nums.length - 1]

	for (;left <= right;) {
		if ((left + right) % 2 === 0) middle = (left + right) / 2
		else middle = (left + right - 1) / 2

		if (nums[middle] === target) {
			if (middle === nums.length - 1) return nums.length - 1
			if (nums[middle + 1] === target) left = middle + 1
			else return middle
		}
		else if (nums[middle] < target) left = middle + 1
		else right = middle - 1
	}

	return -1
}

console.log(getStartEnd([1, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5 ,6, 7, 8, 9, 9, 9, 10], 5))