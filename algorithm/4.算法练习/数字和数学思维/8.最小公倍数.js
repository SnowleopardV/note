// str为'12 16'形式
function commonMutiple (str) {
    const [A, B] = str.split(' ').map(Number)

    for (let i = 1; i <= A * B; i++) {
        if (i % A === 0  && i % B === 0) {
            console.log(i)
            break
        }
    }
}

commonMutiple ('5 7')
commonMutiple ('12 16')
commonMutiple ('24 36')
commonMutiple ('2 4')

// https://www.nowcoder.com/practice/22948c2cad484e0291350abad86136c3?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1.边界确定
// 	for (let i = 1; i <= A * B; i++) {