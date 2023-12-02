// str为'0xAA'
function transform (str) {
// while (str = readline()) {
    // 16进制转10进制
    console.log(parseInt(str, 16))
}

transform('0xAA')
// https://www.nowcoder.com/practice/8f3df50d2b9043208c5eed283d1d4da6?tpId=37&tqId=21225&rp=1&ru=%2Fta%2Fhuawei&qru=%2Fta%2Fhuawei%2Fquestion-ranking

// 总结:
// 1. 进制转换
// 	a.10进制转其他进制
// 		10进制转2进制 parseInt(str).toString(2)
// 		10进制转8进制 parseInt(str).toString(8)
// 		10进制转16进制 parseInt(str).toString(16)
// 	b.其他进制转10进制
// 	  2进制转10进制 parseInt(str, 2)
// 		8进制转10进制 parseInt(str, 8)
// 		16进制转10进制 parseInt(str, 16)
