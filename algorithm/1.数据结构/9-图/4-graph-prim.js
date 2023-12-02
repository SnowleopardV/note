const MinHeap = require("./2-graph-heap");
const UnionFindSet = require("../7-并查集/1-UnionFindSet");

function Prim(graph, v) {
  const nodeCount = graph.getNodeCount();
  const edgeCount = graph.getEdgeCount();
  const minHeap = new MinHeap([], 1000, "cost");
  const unionFindSet = new UnionFindSet(nodeCount);
  const signArr = new Array(nodeCount).fill(0);

  while (signArr[v] === 0) {
    console.log(12, v);
    for (let j = 0; j < nodeCount; j++) {
      let cost = graph.maps[v][j];
      if (cost < graph.maxValue) {
        let i = v;
        signArr[i] = 1;

        if (!unionFindSet.isFriend(i, j)) {
          unionFindSet.union(i, j);
          const edge = { i, j, cost };
          minHeap.insert(edge);
        }
      }
    }

    const min = minHeap.removeMin();
    let { i, j } = min;
    v = j;
  }
}

module.exports = Prim;
