// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。

// 示例 1:

// 输入: nums = [0,1,0,3,12]
// 输出: [1,3,12,0,0]
// 示例 2:

// 输入: nums = [0]
// 输出: [0]

// 提示:

// 1 <= nums.length <= 104
// -231 <= nums[i] <= 231 - 1

const removeZero = (arr) => {
  let fast = (slow = 0)

  while (fast < arr.length) {
    if (arr[fast] !== 0) {
      arr[slow] = arr[fast]
      slow++
    }

    fast++
  }

  while (slow < arr.length) {
    arr[slow] = 0
    slow++
  }

  return arr
}

console.log(37, removeZero([0, 1, 0, 3, 12]))
console.log(37, removeZero([-1, 0, 1, 0, 3, 12]))
console.log(37, removeZero((nums = [0])))
