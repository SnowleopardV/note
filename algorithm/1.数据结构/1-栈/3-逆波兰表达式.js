// 逆波兰表达式
// 1. 中序表达式    VS    后序表达式
//    1 + 2             1 2 +
//    1 + 2 + 3         3 1 2 + +

// 计算机通常是用后序表达式来处理计算
// 4 + 10 / 5
// [4, 10, 5, "/", "+"]
// [4, 2, "+"]
// [6]

// [4, 10, 5, '/', '+']  6
// [4, 10, 5, 4, 2, '/', '+', '*', '-'] -66

const expression = (arr) => {
	const stack = []
	
	while (arr.length) {
		const a = arr.shift()
		stack.push(a)

		if (arr.length) stack.push(arr.pop())
	
	}

	while (stack.length) {
		if (stack.length === 1) return stack[0]
		
		const c = stack.pop()
		const d = stack.pop()
		const e = stack.pop()
		const f = eval(e + d + c)

 		stack.push(f)
	}

}

console.log(expression([4, 10, 5, 4, 2, '/', '+', '*', '-']))
console.log(expression([10, 5, 4, 2, '/', '+', '*']))
console.log(expression([4, 10, 5, '/', '+']))