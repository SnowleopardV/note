const BinaryTree = require("./1-binary-tree");

const binaryTree = new BinaryTree("A(B(D,E(G,)),C(,F))# ");

// console.log(binaryTree.size());
// console.log(binaryTree.height());
// console.log(binaryTree.find("E"));

// console.log(binaryTree.preOrder(binaryTree.root));
// binaryTree.mirror2(binaryTree.root);
// console.log(binaryTree.preOrder2(binaryTree.root));

// 案例1 求一棵树的镜像
// 将每个结点的左右子树交换位置, 实现mirror方法

// 案例2 使用非递归方式实现前序遍历
// 使用while循环和stack

// console.log(binaryTree.preOrder(binaryTree.root));
// console.log(binaryTree.preOrder2(binaryTree.root));

// 案例3 使用非递归方式, 实现中序遍历和后续遍历两种遍历方法
// console.log(binaryTree.postOrder(binaryTree.root));
// console.log(binaryTree.postOrder2(binaryTree.root));

// 案例4 寻找两个结点最近的公共祖先结点
// const nodeA = binaryTree.find("G");
// const nodeB = binaryTree.find("F");
// console.log("nearParent: ", binaryTree.nearParent(nodeA, nodeB));

// 案例5 分层打印二叉树
// binaryTree.sameDeepPrint(binaryTree.root);

// 案例6 输出指定层的结点数
console.log(binaryTree.getCountByDeep(0));
console.log(binaryTree.getCountByDeep(1));
console.log(binaryTree.getCountByDeep(2));
console.log(binaryTree.getCountByDeep(3));
console.log(binaryTree.getCountByDeep(4));
