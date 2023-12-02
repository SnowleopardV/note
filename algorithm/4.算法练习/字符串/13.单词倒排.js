// while (str = readline()) {  
function reverse(str) {
	const tmpStr = str.replace(/[^a-zA-Z]/g, ' ').split(' ').reverse().join(' ')
	console.log(tmpStr)

}

reverse('$bo*y gi!r#l')

// https://www.nowcoder.com/practice/81544a4989df4109b33c2d65037c5836?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1.替代非a-zA-Z的字符 /[^]/
// '$bo*y gi!r#^&****l'.replace(/[^a-zA-Z]+/g, ' ') === ' bo y gi r l'
// '$bo*y gi!r#^&****l'.replace(/[^a-zA-Z]/g, ' ') === ' bo y gi r       l'
