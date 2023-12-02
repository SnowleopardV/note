const Kruskal = require("./3-graph-kruskal");
const Graph = require("./1-graph");

const maxValue = 9999;
let maps = [
  [0, 28, maxValue, maxValue, maxValue, 10, maxValue],
  [28, 0, 16, maxValue, maxValue, maxValue, 14],
  [maxValue, 16, 0, 12, maxValue, maxValue, maxValue],
  [maxValue, maxValue, 12, 0, 22, maxValue, 18],
  [maxValue, maxValue, maxValue, 22, 0, 25, 24],
  [10, maxValue, maxValue, maxValue, 25, 0, maxValue],
  [maxValue, 14, maxValue, 18, 24, maxValue, 0],
];

const graph = new Graph(maps);
Kruskal(graph);
