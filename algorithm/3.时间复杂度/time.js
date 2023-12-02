// O(n) 10,0000,0000 (10亿)
function fun1(n) {
    let result = 0
    for (let i = 0; i < n; i++) {
        result++
    }
    return result
}
// console.time()
// fun1(1000000000)
// console.timeEnd()


// O(n^2) 3,1000 (3万1)
function fun2 (n) {
	let result = 0
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			result++
		}
	}
	return result
}

// console.time()
// fun2(31000)
// console.timeEnd()


// O(n*logn) 3560,0000 (3560万)
function fun3 (n) {
	let result = 0
	for (let i = 0; i < n; i++) {
		for (let j = 1; j < n; j *= 2) {
			result ++
		}
	}
	return result
}

console.time('ok')
fun3(35600000)
console.timeEnd('ok')