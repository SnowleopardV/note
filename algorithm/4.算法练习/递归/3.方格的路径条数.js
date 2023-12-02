// while (str = readline()) {
// str为'2 2'的形式
function getWays(str) {
    const [X, Y] = str.split(' ').map(Number)
    getSteps([X, Y])
}

function getSteps (end) {
    let step1 = move([0, 0], 'R', end)
    let step2 = move([0, 0], 'D', end)

    console.log(step1 + step2)
}

function move (current, to, end) {
    // 超出结束位置
    if (to === 'R' && current[0] + 1 > end[0]) return 0
    else if (to === 'D' && current[1] + 1 > end[1]) return 0
    
    // 刚好到结束位置
    else if (to === 'R' && current[0] + 1 === end[0] && current[1] === end[1]) return 1
    else if (to === 'D' && current[0] === end[0] && current[1] + 1 === end[1]) return 1

    let step1 = 0
    let step2 = 0
    if (to === 'R') {
        let newCurrent = [current[0] + 1, current[1]]
        step1 = move(newCurrent, 'R', end)
        step2 = move(newCurrent, 'D', end)
    } else {
        let newCurrent = [current[0], current[1] + 1]
        step1 = move(newCurrent, 'R', end)
        step2 = move(newCurrent, 'D', end)
    }
    return step1 + step2
}

getWays('1 1')
getWays('1 2')
getWays('2 2')
getWays('3 3')


// https://www.nowcoder.com/practice/e2a22f0305eb4f2f9846e7d644dba09b?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1

// 总结:
// 1.递归
// a.专注处理当前子逻辑
// let step1 = move([0, 0], 'R', end)
// let step2 = move([0, 0], 'D', end)
// console.log(step1 + step2)
// b.边界条件的处理
// 超出结束位置
// if (to === 'R' && current[0] + 1 > end[0]) return 0
// else if (to === 'D' && current[1] + 1 > end[1]) return 0

// // 刚好到结束位置
// else if (to === 'R' && current[0] + 1 === end[0] && current[1] === end[1]) return 1
// else if (to === 'D' && current[0] === end[0] && current[1] + 1 === end[1]) return 1
