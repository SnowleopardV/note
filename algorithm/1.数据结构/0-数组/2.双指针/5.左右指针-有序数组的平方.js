// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

// 示例 1：
// 输入：nums = [-4,-1,0,3,10]
// 输出：[0,1,9,16,100]
// 解释：平方后，数组变为 [16,1,0,9,100]
// 排序后，数组变为 [0,1,9,16,100]

// 示例 2：
// 输入：nums = [-7,-3,2,3,11]
// 输出：[4,9,9,49,121]
//  

// 1 <= nums.length <= 104
// -104 <= nums[i] <= 104
// nums 已按 非递减顺序 排序

const getSortArray = (arr) => {
	console.log(19, arr)
	let leftIndex = 0; 
	let rightIndex = arr.length - 1;

	let result = []
	

	while (leftIndex <= rightIndex) {

		if (arr[leftIndex] * arr[leftIndex] >= arr[rightIndex] * arr[rightIndex]) {
			result.unshift(arr[leftIndex] * arr[leftIndex])
		  leftIndex++
		} else {
			result.unshift(arr[rightIndex] * arr[rightIndex])
			rightIndex--
		}
	}

	console.log(36)

	console.log(result)

	return result

}

getSortArray([-7,-3,2,3,11])




// 进阶：

// 请你设计时间复杂度为 O(n) 的算法解决本问题

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/squares-of-a-sorted-array
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

function sortedSquares (nums) {
	let [left, right, index] = [0, nums.length - 1, nums.length - 1]
	const newArr = new Array(index + 1)

	for (;left <= right;) {
		const leftSquare = nums[left] * nums[left]
		const rightSquare = nums[right] * nums[right]

		if (leftSquare > rightSquare) {
			newArr[index] = leftSquare
			left++
		} else {
			newArr[index] = rightSquare
			right--
		}
		index--
	}

	return newArr
};

console.log(sortedSquares([-4,-1,0,3,10]))
