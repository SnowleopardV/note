const { LinkList, HashTable } = require("./1-hash-table");

const hashTable = new HashTable(14);
console.log(hashTable);
hashTable.getIndex("name");
hashTable.getIndex("age");
hashTable.getIndex("sex");
hashTable.getIndex("grade");
hashTable.getIndex("parent");

hashTable.set("grade", 1);
hashTable.set("parent", "jack");
console.log("hashTable.items: ", hashTable.items);

hashTable.set("grade", 1000000000);
hashTable.get("grade");
hashTable.get("parent");
hashTable.delKey("grade");
console.log("hashTable.items: ", hashTable.items);
hashTable.hasKey("grade");
