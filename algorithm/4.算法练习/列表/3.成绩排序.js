
while (str = readline()) {
	let all = []

	const num = parseInt(str)
	const lowToHight = Boolean(parseInt(readline()))

	for (let i = 1; i <= num; i++) {
		const [name, count] = readline().split(' ')
		all.push({
			name,
			count: parseInt(count),
			i
		})
	}

	const tmp = all.sort((a, b) => {
		if (a.count === b.count) {
			return a.i - b.i
		} else {
			if (lowToHight) return a.count - b.count
			else return b.count - a.count
		}
	})
	
	for (let item of tmp) {
		console.log(item.name + ' ' + item.count)
	}
}


// https://www.nowcoder.com/practice/8e400fd9905747e4acc2aeed7240978b?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1
// 总结:
// 1. Boolean 和 1, 0, '1', '0' 的转换关系
