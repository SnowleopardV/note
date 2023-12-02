// 给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。
// 进阶：不要 使用任何内置的库函数，如  sqrt 。

// 示例 1：
// 输入：num = 16
// 输出：true

// 示例 2：
// 输入：num = 14
// 输出：false

// 1 <= num <= 2^31 - 1

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/valid-perfect-square
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


function isSquare (num) {
  if (num === 0) return true
	let [left, right] = [0, num]
	let middle

	for (;left <= right;) {
		if ((left + right) % 2 === 0) middle = (left + right) / 2
		else middle = (left + right + 1) / 2
		
		if (middle * middle === num) return true
		else if (middle * middle < num) {
			if ((middle + 1) * (middle + 1) > num) return false
			left = middle
		}
		else right = middle
	}
}
console.log(isSquare(0))
console.log(isSquare(1))
console.log(isSquare(2))
console.log(isSquare(4))