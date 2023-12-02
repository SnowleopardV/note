// 案例2 斐波那契数列
// f(n) = f(n-1) + f(n-2)
// f(0) = 1
// f(1) = 1
// f(2) = 2
// f(3) = 3

const fibonacci = n => {
	if (n === 0) return 1
	if (n === 1) return 1

	const queue = [1, 1]

	while (n >= 2) {

		const a = queue.shift()
		const b = queue[0]

		queue.push(a + b)

		n--

	}

	return queue[1]
}

console.log(fibonacci(0)) // 1
console.log(fibonacci(1)) // 1 
console.log(fibonacci(2)) // 2
console.log(fibonacci(3)) // 3
console.log(fibonacci(4)) // 5
console.log(fibonacci(5)) // 8
console.log(fibonacci(6)) // 13
console.log(fibonacci(60)) // 13
