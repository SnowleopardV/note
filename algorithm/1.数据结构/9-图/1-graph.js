const Queue = require("../2-队列/1-queue");
class Graph {
  constructor(maps) {
    this.maps = maps;
    this.nodeCount = 0;
    this.edgeCount = 0;
    this.maxValue = 9999;

    this.getNodeCount();
    this.getEdgeCount();
  }

  getNodeCount() {
    this.nodeCount = this.maps.length;
    return this.nodeCount;
  }

  getEdgeCount() {
    for (let i = 0; i < this.nodeCount; i++) {
      for (let j = i + 1; j < this.nodeCount; j++) {
        if (this.maps[i][j] > 0 && this.maps[i][j] < this.maxValue) {
          this.edgeCount++;
        }
      }
    }
    return this.edgeCount;
  }

  getWeight(u, v) {
    return this.maps[u][v];
  }

  graphDeepFirstSearch(v) {
    this.visited = new Array(this.nodeCount).fill(0);
    let componet = [];

    let deepFirstSearch = (v) => {
      this.visited[v] = 1;
      componet.push(v);

      let row = this.maps[v];

      for (let i = 0; i < row.length; i++) {
        if (row[i] < this.maxValue && this.visited[i] == 0) {
          deepFirstSearch(i);
        }
      }
    };

    deepFirstSearch(v);
    console.log("deepFirstSearch", componet);
    return componet;
  }

  // 非连通图的深度遍历
  graphDeepFirstSearch2(v) {
    let visited = new Array(this.nodeCount).fill(0);
    let linkedGraph = [];

    let deepFirstSearch = (v, component) => {
      visited[v] = 1;
      component.push(v);

      let row = this.maps[v];

      for (let i = 0; i < row.length; i++) {
        if (row[i] < this.maxValue && visited[i] == 0) {
          deepFirstSearch(i, component);
        }
      }
    };

    // 这个循环的目的在于遍历非连通图
    for (let i = 0; i < this.nodeCount; i++) {
      if (visited[i] === 0) {
        let component = [];
        deepFirstSearch(i, component);
        linkedGraph.push(component);
      }
    }
    console.log("deepFirstSearch2", linkedGraph);
    return linkedGraph;
  }

  graphBreadthFirstSearch(v) {
    let visited = new Array(this.nodeCount).fill(0);
    visited[v] = 1;

    let queue = new Queue();
    queue.enqueue(v);

    let component = [];
    component.push(v);

    while (queue.size() > 0) {
      let item = queue.dequeue();
      let row = this.maps[item];
      for (let j = 0; j < row.length; j++) {
        if (row[j] < this.maxValue && visited[j] === 0) {
          queue.enqueue(j);
          component.push(j);
          visited[j] = 1;
        }
      }
    }
    console.log("breadthFirstSearch", component);
    return component;
  }

  // 非连通图的广度遍历
  graphBreadthFirstSearch2(v) {
    let visited = new Array(this.nodeCount).fill(0);
    let linkedgraph = [];

    // 这个循环在于遍历非连通图
    for (let i = 0; i < this.nodeCount; i++) {
      if (visited[i] === 0) {
        let queue = new Queue();
        queue.enqueue(i);
        let component = [];
        component.push(i);
        visited[i] = 1;

        while (queue.size() > 0) {
          let item = queue.dequeue();
          let row = this.maps[item];
          for (let j = 0; j < row.length; j++) {
            // console.log(128, i, j);
            if (row[j] < this.maxValue && visited[j] === 0) {
              queue.enqueue(j);
              component.push(j);
              visited[j] = 1;
            }
          }
        }

        linkedgraph.push(component);
      }
    }
    console.log("breadthFirstSearch2", linkedgraph);
    return linkedgraph;
  }
}

module.exports = Graph;
