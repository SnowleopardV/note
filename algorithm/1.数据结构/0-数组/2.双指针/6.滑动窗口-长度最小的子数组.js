// 给定一个含有 n 个正整数的数组和一个正整数 target 。
// 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

// 示例 1：
// 输入：target = 7, nums = [2,3,1,2,4,3]
// 输出：2
// 解释：子数组 [4,3] 是该条件下的长度最小的子数组。

// 示例 2：
// 输入：target = 4, nums = [1,4,4]
// 输出：1

// 示例 3：
// 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
// 输出：0

// 提示：
// 1 <= target <= 109
// 1 <= nums.length <= 105
// 1 <= nums[i] <= 105
//

// 进阶：
// 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/minimum-size-subarray-sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

function minSubArrayLen(target, nums) {
  let left = (right = sum = 0)
  let result = nums.length + 1

  while (right < nums.length) {
    sum += nums[right++]

    while (sum >= target) {
      result = result < right - left ? result : right - left
      sum -= nums[left++]
    }
  }

  // return nums.slice(left - 1, right)
  return result > nums.length ? 0 : result

  // let left = right = sum = 0, len = nums.length, res = nums.length + 1;

  // while (right < len) {
  //     sum += nums[right++]
  //     while (sum >= target) {
  //         res = res < right - left ? res : right - left
  //         sum-=nums[left++]
  //     }
  // }

  // console.log(left, right, len, res)
  // return res > len ? 0 : res

  // const len = nums.length;
  // let left = right = sum = 0,
  //     res = len + 1; // 子数组最大不会超过自身
  //     console.log(left, right, sum, len, res)
  // while(right < len) {
  //     sum += nums[right++];
  //     // 窗口滑动
  //     while (sum >= target) {
  //         // r始终为开区间 [l, r)
  //         res = res < right - left ? res : right - left;
  //         sum-=nums[left++];
  //     }
  // }

  // console.log(left, right, len, res)
  // return res > len ? 0 : res;
}

console.log(minSubArrayLen(11, [1, 1, 1, 7, 4, 3, 1, 1, 1, 1, 1]))

const getShortestArray = (target, nums) => {
  let left = 0
  let right = nums.length - 1
  let obj = {len: 0}

  while (right >= left) {
    if (left === right) {
      if (nums[left] >= target) return { len: 1, left, right }
      else return { len: 0, left, right }
    }

    let result = 0

    for (let i = left; i <= right; i++) {
      result += nums[i]
    }

    if (result >= target) {
      const len = right - left + 1
      obj = { len, left, right }
    } else {
      return obj
    }

    if (nums[left] > nums[right]) {
      if (right > 0) right--
    } else {
      if (left < nums.length - 1) left++
    }
  }
}

console.log(
  getShortestArray(80, [1, 1, 1, 7, 2, 1, 1, 4, 1, 4, 1, 3, 1, 1, 1, 1, 1])
)
