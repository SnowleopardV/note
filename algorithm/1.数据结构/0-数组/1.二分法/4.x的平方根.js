// 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
// 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
// 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。
// 0 <= x <= 231 - 1

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/sqrtx
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


function sqrtX (x) {
  if (x === 0) return 0
	let [left, right] = [0, x]
	let middle

	for (;left <= right;) {
		if ((left + right) % 2 === 0) middle = (left + right) / 2
		else middle = (left + right + 1) / 2

		if (middle * middle === x) return middle
		else if (middle * middle < x) {
			if ((middle + 1) * (middle + 1) > x) return middle
			left = middle
		}
		else right = middle
	}
}
console.log(sqrtX (1))
console.log(sqrtX (9))
console.log(sqrtX (8))
console.log(sqrtX (255))