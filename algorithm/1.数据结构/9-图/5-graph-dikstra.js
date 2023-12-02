
function dikstra(graph, start, end) {
  let INF = Infinity;
  let sign = [];
  let shortestDistances = {};
  for (let i in graph) {
    shortestDistances[i] = INF;
  }
  let path = {};

  let current = start;
  shortestDistances[current] = 0;
  let currentShortestDistance = INF;

  while (true) {
    sign.push(current);
    for (let i in graph[current]) {
      // current可以到达i点, i点原最小路径长度为shortestDistances[i];
      // 判断shortestDistances[current] + graph[current][i]是否比shortestDistances[i]还小
      if (
        shortestDistances[current] + graph[current][i] <
        shortestDistances[i]
      ) {
        shortestDistances[i] = shortestDistances[current] + graph[current][i];
        // 记录i的最小路径的子路径来自current
        path[i] = current;
      }
    }

    let minDistance = INF;
    for (let i in graph) {
      if (sign.indexOf(i) > -1) {
        continue;
      }

      if (shortestDistances[i] < minDistance) {
        minDistance = shortestDistances[i];
        current = i;
      }
    }
    if (minDistance === INF) {
      break;
    }
  }
  console.log(path, shortestDistances);

  let road = [];
  while (end !== start) {
    road.unshift(end);
    end = path[end];
  }
  road.unshift(start);

  console.log("road", road);
}
module.exports = dikstra;
