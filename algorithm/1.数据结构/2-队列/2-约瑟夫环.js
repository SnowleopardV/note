// 约瑟夫环
// 有一个数组a[100], 存在0-99, 要求每隔两个数删掉一个数, 到末尾时, 循环至开头继续进行, 求最后一个被删除的数
// [0, 1, 2, 3, 4, 5, 6, ... 98, 99]  -> 删除2, 5, 8,....  ->  [0, 1, 3, 4, 6, ...]
const ring = (arr) => {
	const queue = []

	for (let item of arr) queue.push(item) 

	let i = 0

	while (queue.length) {
		if (queue.length === 1) return queue[0]

		if ((i % 3) === 0) queue.shift()
		else queue.push(queue.shift())

		console.log(16, queue)
		i++
	}
}


let arr = []
for (let i = 0; i < 100; i++) {
  arr.push(i)
}

console.log(ring(arr));