// while (str = readline()) {
function getLongBitLength (str) {
	const bitStr = parseInt(str).toString(2)
	const newBitStr = bitStr.replace(/[0]+/g, ' ')
	const arr = newBitStr.split(' ').sort((a, b) => b.length - a.length)

	console.log(arr[0].length)
}
getLongBitLength(3)
getLongBitLength(5)
getLongBitLength(200)
// https://www.nowcoder.com/practice/4b1658fd8ffb4217bc3b7e85a38cfaf2?tpId=37&&tqId=21309&rp=1&ru=/ta/huawei&qru=/ta/huawei/question-ranking

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

// 2. 去除重复的元素
// bitStr.replace(/[0]+/g, '0')