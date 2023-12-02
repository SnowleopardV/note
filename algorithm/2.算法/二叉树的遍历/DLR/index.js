// https://blog.csdn.net/qq_29334605/article/details/104311541
// 树的表示
const tree = {
  value: 1,
	left: {
		value: 2,
		left: {
			value: 4,
		},
		right: {
			value: 5
		}
	},
	right: {
		value: 3,
		left: {
			value: 6
		},
		right: {
			value: 7
		}
	}
}

//		  1
//		2    3
// 4    5     6


function DLR (node) {
	if (node) {
		if (node.value) console.log(node.value)
		DLR(node.left)
		DLR(node.right)
	}
}

DLR(tree)
