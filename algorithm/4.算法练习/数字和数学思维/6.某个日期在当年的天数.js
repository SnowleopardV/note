//  str 为'2012 12 31'形式
function dateFromStr (str) {
    const [year, month, day] = str.split(' ').map(Number)

    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    // 闰年的计算
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0 && year % 100 === 0)) days[1] = 29
    
    let c = 0
    
    for (let i = 0; i < month - 1; i++) {
        c += days[i]
    }
    c += day
    console.log(c)
}

dateFromStr('2012 12 31')
dateFromStr('1992 1 16')
dateFromStr('1991 10 10')


// https://www.nowcoder.com/practice/769d45d455fe40b385ba32f97e7bcded?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1.闰年的计算
// 	a.非整100的情况下, 能被4整除
// 	b.整100的情况下, 能被400整除
// 2.数字字符串转成数字数组
// str.split(' ').map(Number)