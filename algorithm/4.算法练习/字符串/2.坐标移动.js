
// while (str = readline()) {
function getPoint (str) {
    const arr = str.split(';')
    let x = 0
    let y = 0

    for (let line of arr) {

        const to = line[0]
        const length = line.slice(1, line.length)
        let reg = /^[0-9]+$/
        if (!['A', 'D', 'W', 'S'].includes(to)) continue;

        if (!reg.test(length)) continue

        if (to === 'A') x = x - parseInt(length)
        if (to === 'D') x = x + parseInt(length)
        if (to === 'W') y = y + parseInt(length)
        if (to === 'S') y = y - parseInt(length)
     }
    console.log(`${x},${y}`)
}

getPoint('A10;S20;W10;D30;X;A1A;B10A11;;A10;')

// https://www.nowcoder.com/practice/119bcca3befb405fbe58abe9c532eb29?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1. 数组是否包含某个元素 includes方法 ['A', 'D', 'W', 'S'].includes(to) 
// 2. 判断一个字符串为纯数字 /^[0-9]+$/.test('1234b555') === false
// 3. 变量自增和自减 a += b; a-= b
