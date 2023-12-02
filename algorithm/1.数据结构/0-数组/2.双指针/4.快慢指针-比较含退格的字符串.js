// 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 true 。# 代表退格字符。
// 注意：如果对空文本输入退格字符，文本继续为空。

// 示例 1：
// 输入：s = "ab#c", t = "ad#c"
// 输出：true
// 解释：s 和 t 都会变成 "ac"。

// 示例 2：
// 输入：s = "ab##", t = "c#d#"
// 输出：true
// 解释：s 和 t 都会变成 ""。

// 示例 3：
// 输入：s = "a#c", t = "b"
// 输出：false
// 解释：s 会变成 "c"，但 t 仍然是 "b"。

// 提示：
// 1 <= s.length, t.length <= 200
// s 和 t 只含有小写字母以及字符 '#'

// 进阶：

// 你可以用 O(n) 的时间复杂度和 O(1) 的空间复杂度解决该问题吗？
// 通过次数154,980提交次数316,765

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/backspace-string-compare
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

function backspaceCompare(s, t) {
    const sStr = getStr(s.split(''))
    const tStr = getStr(t.split(''))

    if (sStr === tStr) return true
    return false
}

function getStr(arr) {
    let slowIndex = 0
    for (let fastIndex = 0; fastIndex < arr.length; fastIndex++) {
        if (arr[fastIndex] === '#') {
            if (slowIndex > 0) slowIndex--
        } else {
            arr[slowIndex] = arr[fastIndex]
            slowIndex++
        }
    }

    arr.splice(slowIndex)
    const str = arr.join('')
    return str
}

console.log(backspaceCompare('y#fo##f','y#f#o##f'))





// const computeStr = (str) => {

// 	const array = str.split('')

// 	let slowIndex = 0

// 	for (let fastIndex = 0; fastIndex < array.length; fastIndex++) {
// 		if (array[fastIndex] === '#') {
// 			if (slowIndex > 0) slowIndex--
//   	} else {
// 			array[slowIndex] = array[fastIndex]
// 			slowIndex++
// 		}
// 	}

// 	console.log(83, array)

// 	return array.slice(0, slowIndex).join('')

// }
