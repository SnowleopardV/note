const Queue = require("../2-队列/1-queue");
class UnionFindSet {
  constructor(size) {
    this.parent = new Array(size).fill(-1);
  }

  find(item) {
    while (this.parent[item] >= 0) {
      item = this.parent[item];
    }
    // console.log(`find ${item}: `, item);
    return item;
  }

  union(item1, item2) {
    const root1 = this.find(item1);
    const root2 = this.find(item2);
    // root1和root2不相交
    if (root1 === root2) {
      return;
    }
    this.parent[root1] += this.parent[root2];
    this.parent[root2] = root1;
  }

  isFriend(item1, item2) {
    const root1 = this.find(item1);
    const root2 = this.find(item2);

    return root1 === root2;
  }

  showFriendsCircle() {
    const queue = new Queue();

    for (let i = 0; i < this.parent.length; i++) {
      if (this.parent[i] < 0) {
        queue.enqueue(i);
      }
    }

    const friendCircle = [];
    while (queue.size()) {
      const arr = [];
      let queueFriends = new Queue();

      let item = queue.dequeue();

      queueFriends.enqueue(item);
      arr.push(item);

      while (queueFriends.size()) {
        const queueData = queueFriends.dequeue();
        for (let i = 0; i < this.parent.length; i++) {
          if (this.parent[i] == queueData) {
            queueFriends.enqueue(i);
            arr.push(i);
          }
        }
      }
      friendCircle.push(arr);
    }
    console.log(friendCircle);
    return friendCircle;
  }

  printParent() {
    console.log(this.parent);
  }
}

module.exports = UnionFindSet;
