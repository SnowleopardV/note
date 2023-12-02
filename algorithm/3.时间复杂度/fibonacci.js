// 时间复杂度为O(2^n)
function fibonacci (n) {
  if (n <= 0) return 0
  if (n === 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

console.time()
console.log(fibonacci(50))
console.timeEnd()


// 时间复杂度O(n)
function fibonacci2 (n) {
	if (n === 1) return 1

	function getCurrent(pre, current, i) {
		if (i === n - 1) return current
		return getCurrent(current, pre + current, i + 1)
	}

	return getCurrent(0, 1, 0)
}

console.time()
console.log(fibonacci2(50))
console.timeEnd()
