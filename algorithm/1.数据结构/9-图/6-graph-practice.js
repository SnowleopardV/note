const Graph = require("./1-graph");

// 图的存储结构
// 1. 邻接矩阵
let maxValue = 99999;
let maps = [
  [0, 28, maxValue, maxValue, maxValue, 10, maxValue, maxValue, maxValue],
  [28, 0, 16, maxValue, maxValue, maxValue, 14, maxValue, maxValue],
  [maxValue, 16, 0, 12, maxValue, maxValue, maxValue, maxValue, maxValue],
  [maxValue, maxValue, 12, 0, 22, maxValue, 18, maxValue, maxValue],
  [maxValue, maxValue, maxValue, 22, 0, 25, 24, maxValue, maxValue],
  [10, maxValue, maxValue, maxValue, 25, 0, maxValue, maxValue, maxValue],
  [maxValue, 14, maxValue, 18, 24, maxValue, 0, maxValue, maxValue],
  [
    maxValue,
    maxValue,
    maxValue,
    maxValue,
    maxValue,
    maxValue,
    maxValue,
    maxValue,
    9,
  ],
  [
    maxValue,
    maxValue,
    maxValue,
    maxValue,
    maxValue,
    maxValue,
    maxValue,
    9,
    maxValue,
  ],
];

// 2. 使用邻接表表示图, 借助hashtable
const graph = new Graph(maps);
graph.getNodeCount();
// graph.getEdgeCount();
graph.graphDeepFirstSearch(6);
console.log("--------------------------------------");
graph.graphBreadthFirstSearch(6);
console.log("--------------------------------------");
graph.graphDeepFirstSearch2(6);
console.log("--------------------------------------");
graph.graphBreadthFirstSearch2(6);
