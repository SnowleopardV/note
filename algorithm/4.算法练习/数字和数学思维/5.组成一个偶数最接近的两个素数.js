// str为'20'这种形式
function getPrimeNumbe (str) {
    const num = parseInt(str)
    let arr = []
    // 要求最接近的两个素数
    for (let i = num/2; i > 0; i--) {
        if (isZhi(i) && isZhi(num - i)) {
            arr.push(i , num - i)
            break;
        }
    }
    for (let item of arr) {
        console.log(item)
    }
}

function isZhi(num) {
    let count = 0
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) count++
    }
    if (count > 2) return false
    return true
}

getPrimeNumbe(20)
getPrimeNumbe(320)
getPrimeNumbe(190)

// https://www.nowcoder.com/practice/f8538f9ae3f1484fb137789dec6eedb9?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1.质数/素数是只能被自己和1整除的数
// 	a.质数的判断
// 	function isPrime(num) {
// 		let count = 0
// 		for (let i = 1; i <= num; i++) {
// 				if (num % i === 0) count++
// 		}
// 		if (count > 2) return false
// 		return true
// 	}

// 2.合数是除了自己和1还有其他能被整除的数
// 3.1既不是质数也不是合数
// 4.要求最接近的两个素数
// 	for (let i = num/2; i > 0; i--) {
// 		if (isZhi(i) && isZhi(num - i)) {
// 				arr.push(i , num - i)
// 				break;
// 		}
// 	}
// 5.结束for循环 break
// 	for (let i = num/2; i > 0; i--) {
// 		if (isZhi(i) && isZhi(num - i)) {
// 				arr.push(i , num - i)
// 				break;
// 		}
// 	}
