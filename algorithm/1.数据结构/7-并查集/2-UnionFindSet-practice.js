const UnionFindSet = require("./1-UnionFindSet");

const unionFindSet = new UnionFindSet(10);
unionFindSet.printParent();
unionFindSet.union(0, 7);
unionFindSet.union(1, 6);
unionFindSet.union(4, 8);
unionFindSet.union(8, 2);
unionFindSet.union(9, 0);
unionFindSet.union(3, 5);
unionFindSet.union(1, 2);
unionFindSet.printParent();
unionFindSet.showFriendsCircle();
