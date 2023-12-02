// 判断一个字符串的括号是否合法
// sdf(sd[f]{}klj9(dsaf(sadfdsa)df)sadflkjj)   // 成对出现, 合法
// sdfa(asdfadsf(阿斯顿范德萨发的)(sad1234(   //不成对出现, 不合法


const ifLegal = (str) => {
	const stack = []
	for (let i of str) {
		if (i===')') {
			if (stack.length < 1 || stack.pop() !== '(') return false
		} else if (i === '(') stack.push('(')
	}

	if (stack.length > 0) return false
	return true
}


console.log(ifLegal('sdf(sd[f]{}klj9(dsaf(sadfdsa)df)sadflkjj)'))
console.log(ifLegal('sdf(sd[f]{}klj9(dsaf(sadfdsa)df)sadflkjj))'))
console.log(ifLegal('sdfa(asdfadsf(阿斯顿范德萨发的)(sad1234( '))