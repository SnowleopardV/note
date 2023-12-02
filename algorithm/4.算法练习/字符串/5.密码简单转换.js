function getPass(str) {
	let pass = ''
	const keys = {
			a: 2,
			b: 2,
			c: 2,
			d: 3,
			e: 3,
			f: 3, 
			g: 4,
			h: 4,
			i: 4,
			j: 5,
			k: 5,
			l: 5,
			m: 6,
			n: 6,
			o: 6,
			p: 7,
			q: 7,
			r: 7,
			s: 7,
			t: 8,
			u: 8,
			v: 8,
			w: 9,
			x: 9,
			y: 9,
			z: 9
	}
	for (let i = 0; i < str.length; i++) {
		const code = str[i].charCodeAt(0)
		if (code >= 65 && code <= 89) {
				pass+=String.fromCharCode(code+33)
		}
		else if (code === 90) {
				pass+='a'
		}
		else if (code >= 97 && code <= 122) {
				pass+=keys[str[i]]
		}
		else {
				pass+=str[i]
		}
	} 
	console.log(pass)
}

getPass('YUANzhi1987')


// https://www.nowcoder.com/practice/7960b5038a2142a18e27e4c733855dac?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1. 获取字符的code,  'a'.charCodeAt(0) === 97
// 2. code转成字符, String.fromCharCode(97) === 'a'
// 3. 字典使用