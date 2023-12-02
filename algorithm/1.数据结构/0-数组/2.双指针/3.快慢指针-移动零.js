// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。

// 示例 1:
// 输入: nums = [0,1,0,3,12]
// 输出: [1,3,12,0,0]

// 示例 2:
// 输入: nums = [0]
// 输出: [0]

// 1 <= nums.length <= 104
// -231 <= nums[i] <= 231 - 1

// 进阶：你能尽量减少完成的操作次数吗？
// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/move-zeroes
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


function moveZeroes (nums) {
  let slowIndex = 0

	for (let fastIndex = 0; fastIndex < nums.length; fastIndex++) {
		if (nums[fastIndex] !== 0) {
			nums[slowIndex] = nums[fastIndex]
			slowIndex++
		}
	}


	for (let k = slowIndex; k < nums.length; k++) {
		nums[k] = 0
	}

	return nums
}


console.log(moveZeroes([1, 2, 0, 3, 0, 0, 4, 0, 5, 6, 0, 7, 0, 0, 8, 0, 0, 9, 0, 10]))