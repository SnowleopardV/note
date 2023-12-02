// 求x的n次方
// O(n) 算法
function getXPowerN(x, n) {
	if (n === 0) return 1
	let result = 1
  for (let i = 0; i < n; i++) {
		result *= x
	}
	return result
}
console.time()
console.log(getXPowerN(2, 50000))
console.timeEnd()


// O(logn) 算法
function getXPowerN2(x, n) {
	if (n <= 0) return 1
	if (n % 2 === 1) {
		let t = getXPowerN2(x, (n - 1) / 2)
		return t * t * x
	} else {
		let t = getXPowerN2(x, n / 2)
		return t * t
	}
}

console.time()
console.log(getXPowerN2(2, 50000))
console.timeEnd()