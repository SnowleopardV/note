// while (str = readline()) {
// weight和nums 为数组形式 [1, 2, 3, 4, 5, 6], [3, 4, 2, 3, 6, 5]
function getAllWeight (weight, nums) {
    let result = {0: true}
    // let weight = readline().split(' ').map(Number)
    // let nums = readline().split(' ').map(Number)

    
    for (let i = 0; i < weight.length; i++) {
        // 拿到当前所有的重量数
        let current = Object.keys(result).map(Number)
        
        for (let j = 1; j <= nums[i]; j++) {
            current.forEach(item => {
                let val = item + weight[i] * j
                if (!result[val]) result[val] = true
            })
        }
    }
    console.log(Object.keys(result).length)
}

getAllWeight ([4, 185, 35, 191, 26, 148, 149, 3, 172, 147], [3, 5, 2, 1, 5, 5, 3, 1, 4, 2])
// https://www.nowcoder.com/practice/f9a4c19050fc477e9e27eb75f3bfd49c?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1


while (str = readline()) {
  const num = parseInt(str)
	const weights = readline().split(' ').map(Number)
	const counts = readline().split(' ').map(Number)

	let all = {0: true}

	for (let i = 0; i < weights.length; i++) {
		const tmp = Object.keys(all).map(Number)
		for (let j = 1; j <= counts[i]; j++) {
			tmp.forEach(item => {
				const key = item + weights[i] * j
				if (!all[key]) all[key] = true
			})
		}
	}
	console.log(Object.keys(all).length)

}