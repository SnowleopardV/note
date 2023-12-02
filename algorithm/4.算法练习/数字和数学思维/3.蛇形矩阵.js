// str为'5'这种形式
// while (str = readline()) {
function getSnack (str) {
    const n = parseInt(str)
    const left = leftAngle(n)
    for (let item of left) {
        console.log(item.join(' '))
    }
}


function trangle (n) {
    const arr = [];
    let index = 1
    let tmpArr = []
    // i的索引值从0 - (n+1)*n/2 - 1
    // index的值从1开始
    // i和index之间的关系  index * (index + 1) / 2 - 1 === i ; index ++

    for (let i = 0; i < (n+1)*n/2; i++) {
        tmpArr.push(i+1)
        if (i === ((index + 1) * index)/2 - 1) {
            index ++
            arr.push(tmpArr)
            tmpArr = []
        }
    }
    return arr
 }

 function leftAngle (n) {
    const angleArr = trangle(n)
    const arr= []
    for (let i = 0; i < n; i++) {
        const tmpArr = []
        for (let j = 0; j < n; j++) {
            const ele = angleArr[j].pop()
            if (ele) tmpArr.push(ele)
        }
        arr.push(tmpArr)
        
    }
    return arr
}
getSnack(5)

// https://www.nowcoder.com/practice/649b210ef44446e3b1cd1be6fa4cab5e?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1. 