// while (num = readline()) {
function sameYhAngle (num) {
		const trianle = []
    for (let i = 1; i <= num; i++) {
			console.log(angle(parseInt(i)).join(','))
			trianle.push(angle(parseInt(i)))
		}
    // const arr = angle(parseInt(num))
    // const index = arr.findIndex(item => item%2 === 0)
    // console.log(index >= 0 ? index + 1 : -1)
    // console.log(trianle)
    
}


function angle (num) {
    if (num === 1) return [1]
    if (num === 2) return [1, 1, 1]
    
    const arr = []
    const ahead = angle(num - 1)
    ahead.push(0,0)
    ahead.unshift(0,0)
    for (let i = 0; i < ahead.length - 2; i++) {
        const left = ahead[i]
        const middle = ahead[i+1] ? ahead[i+1] : 0
        const right = ahead[i+2] ? ahead[i+2]: 0
        arr.push(left + middle + right)
    }
    return arr
}

sameYhAngle (5)

// 总结:
// 1. 边界条件, index = 1, 2的情况
// 	if (num === 1) return [1]
// 	if (num === 2) return [1, 1, 1]

// 2. 空的情况, 补零, 遍历的时候注意长度
// 	ahead.push(0,0)
// 	ahead.unshift(0,0)
// 	for (let i = 0; i < ahead.length - 2; i++) {
// 			const left = ahead[i]
// 			const middle = ahead[i+1] ? ahead[i+1] : 0
// 			const right = ahead[i+2] ? ahead[i+2]: 0
// 			arr.push(left + middle + right)
// 	}
// 	return arr
