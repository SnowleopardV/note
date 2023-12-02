const MinHeap = require("./2-graph-heap");
const UnionFindSet = require("../7-并查集/1-UnionFindSet");
const LinkedList = require("../3-链表/1-linked-list");

function Kruskal(graph) {
  const nodeCount = graph.getNodeCount();
  const edgeCount = graph.getEdgeCount();
  const minHeap = new MinHeap([], 1000, "cost");
  const unionFindSet = new UnionFindSet(nodeCount);

  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const cost = graph.maps[i][j];
      if (cost < graph.maxValue) {
        let edg = { i, j, cost };
        minHeap.insert(edg);
      }
    }
  }

  while (minHeap.size() > 0) {
    let min = minHeap.removeMin();
    let { i, j } = min;
    const linkedlist = new LinkedList();
    if (!unionFindSet.isFriend(i, j)) {
      unionFindSet.union(i, j);
      linkedlist.append(i);
      linkedlist.append(j);
      console.log(29, linkedlist);
    }

    // 待将多个短链表合成一个长链表
  }
}

module.exports = Kruskal;
