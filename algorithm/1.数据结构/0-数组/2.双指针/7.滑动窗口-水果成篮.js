// 你正在探访一家农场，农场从左到右种植了一排果树。这些树用一个整数数组 fruits 表示，其中 fruits[i] 是第 i 棵树上的水果 种类 。
// 你想要尽可能多地收集水果。然而，农场的主人设定了一些严格的规矩，你必须按照要求采摘水果：
// 你只有 两个 篮子，并且每个篮子只能装 单一类型 的水果。每个篮子能够装的水果总量没有限制。
// 你可以选择任意一棵树开始采摘，你必须从 每棵 树（包括开始采摘的树）上 恰好摘一个水果 。采摘的水果应当符合篮子中的水果类型。每采摘一次，你将会向右移动到下一棵树，并继续采摘。
// 一旦你走到某棵树前，但水果不符合篮子的水果类型，那么就必须停止采摘。
// 给你一个整数数组 fruits ，返回你可以收集的水果的 最大 数目。

// 示例 1：
// 输入：fruits = [1,2,1]
// 输出：3
// 解释：可以采摘全部 3 棵树。

// 示例 2：
// 输入：fruits = [0,1,2,2]
// 输出：3
// 解释：可以采摘 [1,2,2] 这三棵树。
// 如果从第一棵树开始采摘，则只能采摘 [0,1] 这两棵树。

// 示例 3：
// 输入：fruits = [1,2,3,2,2]
// 输出：4
// 解释：可以采摘 [2,3,2,2] 这四棵树。
// 如果从第一棵树开始采摘，则只能采摘 [1,2] 这两棵树。
// 示例 4：

// 输入：fruits = [3,3,3,1,2,1,1,2,3,3,4]
// 输出：5
// 解释：可以采摘 [1,2,1,1,2] 这五棵树。
//

// 提示：

// 1 <= fruits.length <= 105
// 0 <= fruits[i] < fruits.length

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/fruit-into-baskets
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

function totalFruit(fruits) {
  let left = (right = 0)
  let get = {}
  let result = 0
  let l = 0
  let r = 0

  while (right < fruits.length) {
    get[fruits[right]] = get.hasOwnProperty(fruits[right])
      ? get[fruits[right]] + 1
      : 1
    right++

    while (Object.keys(get).length > 2) {
      const leftKey = fruits[left++]
      if (get[leftKey] > 1) get[leftKey]--
      else {
        delete get['' + leftKey]
      }
    }

    if (result <= right - left) {
      result = right - left
      l = left
      r = right - 1
    }
  }

  console.log(71, l, r)

  console.log(fruits.slice(l, r + 1))
  return result
}

console.log(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]))
console.log(totalFruit([0, 1, 2, 2]))
console.log(totalFruit([1, 2, 3, 2, 2]))

const getFruits = (arr) => {


	if (arr.length === 1) return { left: 0, right: 0,  arr, len: 1 }

  let left = 0
  let right = arr.length - 1
	let result = {}

  while (left <= right) {
    let obj = {}
		if (left === right) return ({
			left, right, arr: arr.slice(left, right + 1), len: 1
		})

    for (let i = left; i <= right; i++) {
      if (!obj[arr[i]]) obj[arr[i]] = 1
      else obj[arr[i]]++
    }

    const kinds = Object.keys(obj)

		if(kinds.length === 1) return {left, right, arr: arr.slice(left, right + 1), len: arr.slice(left, right + 1).length}

    if (kinds.length > 2) {
      if (obj[arr[left]] > obj[arr[right]]) {
				if (obj[arr[right]] > 1) obj[arr[right]]--
				else delete obj[arr[right]]

				if (right > 0) right--
			} else {
				if (obj[arr[left]] > 1) obj[arr[left]]--
				else delete obj[arr[left]]

				if (left < arr.length - 1) left++
			}
 
			result = { left, right, arr: arr.slice(left, right + 1), len: right + 1 - left }
    } else return result
  }

	return result
}

console.log(getFruits([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]))
console.log(getFruits([0, 1, 2, 2]))
console.log(getFruits([1, 2, 3, 2, 2]))
console.log(getFruits([1, 1]))
console.log(getFruits([1]))