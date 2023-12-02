// while (line = readline()) {
function printSameLengthStr(line) {
    // 超出长度
    const over = line.length % 8
    // 需要补齐 8 - over
    let all = line.length
    // 注意over === 0的情况
    if (over !== 0) all = line.length + (8 - over)
    const num = all/8
    const tmpStr = line.padEnd(all, '0')
     for(let i = 0; i < num; i++) {
         console.log(tmpStr.slice(i * 8, i * 8 + 8))
     }
 }

 printSameLengthStr('12345678912345678')


 // https://www.nowcoder.com/practice/d9162298cb5a437aad722fccccaae8a7?tpId=37&tqId=21225&rp=1&ru=%2Fta%2Fhuawei&qru=%2Fta%2Fhuawei%2Fquestion-ranking

//  总结:
//  1. 取余计算 a % 8
//  2. 不被整除补齐 n % 8 !== 0 && n = n + (8 - n % 8)
//  3. 补齐的方法 padStart, padEnd
//  4. 字符串裁切 '12345'.slice(0, 3) = '123'
//  5. 每8个字符输出一次
//     for(let i = 0; i < num; i++) {
//         console.log(tmpStr.slice(i * 8, i * 8 + 8))
//     }
